import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Image as ImageIcon, Layout, Save, Send, 
  Bold, Italic, Underline, Link as LinkIcon, 
  List, ListOrdered, Quote, Code, Heading, X, Eye, Clock
} from "lucide-react";
import { marked } from "marked";

export default function PostEditor() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Essays");
  const [image, setImage] = useState("");
  const [relatedImages, setRelatedImages] = useState([]);
  const [postStatus, setPostStatus] = useState("Published");
  const [readTime, setReadTime] = useState("1 min read");
  
  const [showImageInput, setShowImageInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showRelatedImagesInput, setShowRelatedImagesInput] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (postId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setImage(data.image || "");
          setRelatedImages(data.relatedImages || []);
          setReadTime(data.readTime || "1 min read");
        })
        .catch(console.error);
    }
  }, [postId]);

  useEffect(() => {
    const calculateReadTime = (text) => {
      const wordsPerMinute = 200;
      const noOfWords = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      if (noOfWords === 0) return "1 min read";
      const minutes = Math.ceil(noOfWords / wordsPerMinute);
      return `${minutes} min read`;
    };

    const fullText = title + " " + content;
    setReadTime(calculateReadTime(fullText));
  }, [title, content]);
  
  const insertFormatting = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);
    
    let newContent = "";
    let newCursorStart = start;
    let newCursorEnd = end;

    // Handle block-level formatting (like Heading, Lists, Quotes)
    if (!suffix) {
      // Check if we're at the start of a line or if previous char is a newline
      const isStartOfLine = start === 0 || content[start - 1] === '\n';
      const actualPrefix = isStartOfLine ? prefix : '\n' + prefix;
      
      newContent = beforeText + actualPrefix + selectedText + afterText;
      newCursorStart = start + actualPrefix.length;
      newCursorEnd = end + actualPrefix.length;
    } else {
      // Inline formatting
      const textToWrap = selectedText || "text";
      newContent = beforeText + prefix + textToWrap + suffix + afterText;
      
      if (!selectedText) {
        newCursorStart = start + prefix.length;
        newCursorEnd = newCursorStart + textToWrap.length;
      } else {
        newCursorStart = start;
        newCursorEnd = end + prefix.length + suffix.length;
      }
    }

    setContent(newContent);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
    }, 0);
  };

  const publishPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = postId ? `${import.meta.env.VITE_API_URL}/api/posts/${postId}` : `${import.meta.env.VITE_API_URL}/api/posts`;
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title, 
          description: content.substring(0, 100) + "...", 
          content, 
          category: category || "Essays",
          image: image || undefined,
          relatedImages: relatedImages.filter(url => url.trim() !== ""),
          status: postStatus,
          readTime
        })
      });
      if (res.ok) {
        alert(postId ? "Post Updated Successfully!" : "Post Published Successfully!");
        if (!postId) {
          setTitle("");
          setContent("");
        }
      } else if (res.status === 401) {
        alert("Session expired or Unauthorized. Please log in again.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        const data = await res.json();
        alert("Failed to publish post: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error publishing post.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <Link
          to="/admin/posts"
          className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border border-[#2B1F39]/10 bg-white/50 shadow-sm text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-white transition-colors font-['Montserrat']! text-[0.65rem]! uppercase! tracking-widest! font-bold! w-fit"
        >
          <div className="bg-[#2B1F39] text-[#DFEFE9] w-7 h-7 flex items-center justify-center rounded-full">
            <ArrowLeft size={12} />
          </div>
          Back
        </Link>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button 
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/60 hover:text-[#2B1F39] transition-colors border border-[#2B1F39]/10 shadow-sm bg-white"
          >
            <Eye size={14} />
            {showPreviewMobile ? "Editor" : "Preview"}
          </button>
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white transition-colors border border-[#2B1F39]/10 shadow-sm">
            <Save size={14} />
            Save Draft
          </button>
          <button onClick={() => { if (!title) return alert("Title required!"); setShowPublishModal(true); }} className="flex items-center justify-center gap-2 bg-[#2B1F39] text-[#DFEFE9] px-6 py-2.5 rounded-full font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors shadow-sm">
            <Send size={14} />
            {postId ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Editor */}
        <div className={`space-y-6 ${showPreviewMobile ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white/50 rounded-3xl p-8 border border-[#2B1F39]/10 space-y-6 shadow-sm relative z-30">
            <input
              type="text"
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-0 font-['Bricolage_Grotesque']! text-3xl! sm:text-4xl! font-black! tracking-tight! text-[#2B1F39]! placeholder-[#2B1F39]/20 focus:outline-none focus:ring-0 p-0"
            />
            
            <div className="flex flex-wrap items-center gap-3 border-t border-[#2B1F39]/10 pt-6">
              {/* Cover Image Button */}
              <div className="relative">
                <button 
                  onClick={() => { setShowImageInput(!showImageInput); setShowCategoryInput(false); setShowRelatedImagesInput(false); }} 
                  className="flex items-center gap-2 px-3 py-2 border border-[#2B1F39]/15 rounded-xl bg-white text-[#2B1F39] hover:bg-[#2B1F39]/5 font-['Roboto']! font-bold! text-xs! transition-colors shadow-sm"
                >
                  <ImageIcon size={14} />
                  {image ? "Edit Cover" : "Add Cover"}
                </button>
                {showImageInput && (
                  <div className="absolute top-full mt-3 left-0 bg-white p-3 rounded-xl border border-[#2B1F39]/10 shadow-xl z-50 w-72 flex gap-2 animate-in fade-in slide-in-from-top-2">
                    <input 
                      type="url" 
                      placeholder="Cover Image URL..." 
                      value={image} 
                      onChange={e => setImage(e.target.value)} 
                      className="flex-1 bg-[#2B1F39]/5 border border-[#2B1F39]/15 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#2B1F39]/30 text-xs font-['Roboto']!" 
                    />
                    <button onClick={() => setShowImageInput(false)} className="bg-[#2B1F39] text-[#DFEFE9] px-3 rounded-lg text-[0.6rem] font-['Montserrat']! font-bold! uppercase! tracking-widest!">
                      OK
                    </button>
                  </div>
                )}
              </div>

              {/* Category Button */}
              <div className="relative">
                <button 
                  onClick={() => { setShowCategoryInput(!showCategoryInput); setShowImageInput(false); setShowRelatedImagesInput(false); }} 
                  className="flex items-center gap-2 px-3 py-2 border border-[#2B1F39]/15 rounded-xl bg-white text-[#2B1F39] hover:bg-[#2B1F39]/5 font-['Roboto']! font-bold! text-xs! transition-colors shadow-sm"
                >
                  <Layout size={14} />
                  {category || "Category"}
                </button>
                {showCategoryInput && (
                  <div className="absolute top-full mt-3 left-0 bg-white p-2 rounded-xl border border-[#2B1F39]/10 shadow-xl z-50 w-44 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
                    {["Essays", "Short Read", "Thought Pieces", "Dev Log", "Travel"].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => { setCategory(cat); setShowCategoryInput(false); }}
                        className={`text-left px-3 py-2 rounded-lg text-xs font-['Roboto']! transition-colors ${category === cat ? 'bg-[#2B1F39] text-white' : 'hover:bg-[#2B1F39]/5 text-[#2B1F39]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Button */}
              <div className="relative">
                <button 
                  onClick={() => { setShowRelatedImagesInput(!showRelatedImagesInput); setShowImageInput(false); setShowCategoryInput(false); }} 
                  className="flex items-center gap-2 px-3 py-2 border border-[#2B1F39]/15 rounded-xl bg-white text-[#2B1F39] hover:bg-[#2B1F39]/5 font-['Roboto']! font-bold! text-xs! transition-colors shadow-sm"
                >
                  <ImageIcon size={14} />
                  {relatedImages.length > 0 ? `Gallery (${relatedImages.length})` : "Gallery"}
                </button>
                {showRelatedImagesInput && (
                  <div className="absolute top-full mt-3 left-0 bg-white p-4 rounded-xl border border-[#2B1F39]/10 shadow-xl z-50 w-72 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                    <p className="font-['Montserrat']! text-[0.6rem]! font-bold! uppercase! tracking-widest! text-[#2B1F39]/40!">Related Images</p>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {relatedImages.map((url, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input 
                            type="url" 
                            value={url} 
                            onChange={e => {
                              const newArr = [...relatedImages];
                              newArr[i] = e.target.value;
                              setRelatedImages(newArr);
                            }} 
                            placeholder="URL..." 
                            className="flex-1 bg-[#2B1F39]/5 border border-[#2B1F39]/15 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#2B1F39]/30 text-[0.7rem] font-['Roboto']!" 
                          />
                          <button onClick={() => setRelatedImages(relatedImages.filter((_, idx) => idx !== i))} className="text-[#2B1F39]/30 hover:text-red-500 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setRelatedImages([...relatedImages, ""])} className="text-[0.65rem] font-['Montserrat']! font-bold! text-[#2B1F39]/60 border border-dashed border-[#2B1F39]/20 rounded-lg p-2 hover:bg-[#2B1F39]/5 transition-colors uppercase tracking-widest">
                      + Add Image
                    </button>
                    <button onClick={() => setShowRelatedImagesInput(false)} className="bg-[#2B1F39] text-[#DFEFE9] w-full py-2 rounded-lg text-[0.65rem] font-['Montserrat']! font-bold! uppercase! tracking-widest! mt-1">
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Read Time Display */}
              <div className="flex items-center gap-2 px-3 py-2 border border-[#2B1F39]/10 rounded-xl bg-[#2B1F39]/5 text-[#2B1F39]/60 font-['Roboto']! font-bold! text-xs! shadow-inner">
                <Clock size={14} />
                {readTime}
              </div>
            </div>
          </div>

          <div className="bg-white/50 rounded-3xl border border-[#2B1F39]/10 shadow-sm flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#2B1F39]/10 bg-white/40">
                <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#2B1F39]/10">
                  <button onClick={() => insertFormatting('# ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Heading">
                    <Heading size={16} />
                  </button>
                  <button onClick={() => insertFormatting('**', '**')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Bold">
                    <Bold size={16} />
                  </button>
                  <button onClick={() => insertFormatting('_', '_')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Italic">
                    <Italic size={16} />
                  </button>
               </div>
               
               <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-[#2B1F39]/10">
                  <button onClick={() => insertFormatting('- ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Bullet List">
                    <List size={16} />
                  </button>
                  <button onClick={() => insertFormatting('1. ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Numbered List">
                    <ListOrdered size={16} />
                  </button>
               </div>

               <div className="flex items-center gap-0.5">
                  <button onClick={() => insertFormatting('> ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Quote">
                    <Quote size={16} />
                  </button>
                  <button onClick={() => insertFormatting('[Link](', ')')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Link">
                    <LinkIcon size={16} />
                  </button>
                  <button onClick={() => insertFormatting('`', '`')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Code">
                    <Code size={16} />
                  </button>
                  <button onClick={() => insertFormatting('![Image](', ')')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Image">
                    <ImageIcon size={16} />
                  </button>
               </div>
            </div>
            
            <textarea
              ref={textareaRef}
              placeholder="Start writing your masterpiece here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[500px] p-8 bg-transparent border-0 font-['Roboto']! text-base! sm:text-lg! leading-[1.8]! text-[#2B1F39]! placeholder-[#2B1F39]/20 focus:outline-none focus:ring-0 resize-y"
            />
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className={`sticky top-8 flex flex-col max-h-[calc(100vh-120px)] ${showPreviewMobile ? 'block' : 'hidden lg:flex'}`}>
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#2B1F39]/10 shadow-sm flex flex-col overflow-hidden h-full">
            <div className="flex items-center justify-between p-4 border-b border-[#2B1F39]/10 bg-white/40">
              <span className="font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-[0.2em]! text-[#2B1F39]/40!">Live Preview</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2B1F39]/10" />
                <div className="w-2 h-2 rounded-full bg-[#2B1F39]/10" />
                <div className="w-2 h-2 rounded-full bg-[#2B1F39]/10" />
              </div>
            </div>
            <div 
              ref={previewRef}
              className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1
                text-[#2B1F39]/80 font-['Roboto']! text-base sm:text-lg leading-[1.8]! tracking-[0.01em]!
                [&>p]:mb-6 
                [&>h1]:font-['Bricolage_Grotesque']! [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-[#2B1F39] [&>h1]:mb-6 [&>h1]:mt-8
                [&>h2]:font-['Bricolage_Grotesque']! [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#2B1F39] [&>h2]:mt-10 [&>h2]:mb-4
                [&>h3]:font-['Bricolage_Grotesque']! [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#2B1F39] [&>h3]:mt-8 [&>h3]:mb-3
                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-2
                [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol>li]:mb-2
                [&>blockquote]:border-l-4 [&>blockquote]:border-[#2B1F39] [&>blockquote]:bg-[#2B1F39]/3 [&>blockquote]:pl-6 [&>blockquote]:pr-4 [&>blockquote]:py-4 [&>blockquote]:mb-8 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:text-[#2B1F39]
                [&>code]:bg-[#2B1F39]/5 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#2B1F39] [&>code]:text-[0.9em] [&>code]:font-mono
                [&>pre]:bg-[#2B1F39]/5 [&>pre]:p-4 [&>pre]:rounded-2xl [&>pre]:mb-8 [&>pre]:overflow-x-auto
                [&>pre>code]:bg-transparent [&>pre>code]:p-0
                [&>img]:rounded-2xl [&>img]:mb-8 [&>img]:w-full [&>img]:shadow-sm
                [&>a]:text-[#2B1F39] [&>a]:underline [&>a]:decoration-[#2B1F39]/30 [&>a]:underline-offset-4 hover:[&>a]:decoration-[#2B1F39]
              "
              dangerouslySetInnerHTML={{ __html: marked.parse(content || "_Your content preview will appear here..._") }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPublishModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2B1F39]/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 max-w-md w-full shadow-2xl border border-[#2B1F39]/5"
            >
              <h2 className="font-['Bricolage_Grotesque']! text-3xl! font-bold! text-[#2B1F39]! mb-2">
                Ready to publish?
              </h2>
              <p className="font-['Roboto']! text-[#2B1F39]/60! mb-8">
                Double-check your post settings before making it live to the world.
              </p>
              
              <div className="space-y-5 mb-10">
                <div>
                  <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/60! mb-2 ml-1">
                    Visibility
                  </label>
                  <select 
                    value={postStatus}
                    onChange={(e) => setPostStatus(e.target.value)}
                    className="w-full bg-[#2B1F39]/5 border border-[#2B1F39]/10 rounded-2xl px-5 py-4 font-['Roboto']! text-[0.95rem]! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/30 cursor-pointer transition-colors"
                  >
                    <option value="Published">🌎 Public - Visible to everyone</option>
                    <option value="Draft">🔒 Draft - Only visible to you</option>
                  </select>
                </div>
                <div>
                  <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/60! mb-2 ml-1">
                    Category
                  </label>
                  <div className="w-full bg-[#2B1F39]/5 border border-[#2B1F39]/10 rounded-2xl px-5 py-4 font-['Roboto']! text-[0.95rem]! text-[#2B1F39]! opacity-80">
                    {category || "Uncategorized"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  onClick={() => setShowPublishModal(false)}
                  className="px-6 py-3 rounded-full font-['Montserrat']! font-bold! text-[0.7rem]! uppercase! tracking-widest! text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowPublishModal(false);
                    publishPost();
                  }}
                  className="bg-[#2B1F39] text-[#DFEFE9] px-7 py-3 rounded-full font-['Montserrat']! font-bold! text-[0.7rem]! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <Send size={14} />
                  Confirm & {postId ? "Update" : "Publish"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
