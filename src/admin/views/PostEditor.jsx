import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Image as ImageIcon, Layout, Save, Send, 
  Bold, Italic, Underline, Link as LinkIcon, 
  List, ListOrdered, Quote, Code, Heading 
} from "lucide-react";

export default function PostEditor() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Essays");
  const [image, setImage] = useState("");
  const [postStatus, setPostStatus] = useState("Published");
  
  const [showImageInput, setShowImageInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:5000/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setImage(data.image || "");
        })
        .catch(console.error);
    }
  }, [postId]);
  
  const insertFormatting = (syntax) => {
    // Just mock functionality for UI
    setContent(content + syntax);
  };

  const publishPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = postId ? `http://localhost:5000/api/posts/${postId}` : "http://localhost:5000/api/posts";
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
          status: postStatus
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
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white transition-colors border border-[#2B1F39]/10 shadow-sm">
            <Save size={14} />
            Save Draft
          </button>
          <button onClick={() => { if (!title) return alert("Title required!"); setShowPublishModal(true); }} className="flex items-center justify-center gap-2 bg-[#2B1F39] text-[#DFEFE9] px-6 py-2.5 rounded-full font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors shadow-sm">
            <Send size={14} />
            {postId ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      <div className="space-y-6">
        <div className="bg-white/50 rounded-3xl p-8 lg:p-10 border border-[#2B1F39]/10 space-y-6 shadow-sm">
          <input
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-0 font-['Bricolage_Grotesque']! text-4xl! sm:text-5xl! font-black! tracking-tight! text-[#2B1F39]! placeholder-[#2B1F39]/20 focus:outline-none focus:ring-0 p-0"
          />
          
          <div className="flex flex-wrap items-center gap-4 border-t border-[#2B1F39]/10 pt-6">
            <div className="relative">
              <button 
                onClick={() => { setShowImageInput(!showImageInput); setShowCategoryInput(false); }} 
                className="flex items-center gap-2 px-4 py-2 border border-[#2B1F39]/15 rounded-xl bg-white text-[#2B1F39] hover:bg-[#2B1F39]/5 font-['Roboto']! font-bold! text-sm! transition-colors shadow-sm"
              >
                <ImageIcon size={16} />
                {image ? "Change Cover Image" : "Add Cover Image"}
              </button>
              {showImageInput && (
                <div className="absolute top-full mt-3 left-0 bg-white p-3 rounded-xl border border-[#2B1F39]/10 shadow-lg z-20 w-72 lg:w-80 flex gap-2 animate-in fade-in slide-in-from-top-2">
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    value={image} 
                    onChange={e => setImage(e.target.value)} 
                    className="flex-1 bg-[#2B1F39]/5 border border-[#2B1F39]/15 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#2B1F39]/30 text-sm font-['Roboto']!" 
                  />
                  <button onClick={() => setShowImageInput(false)} className="bg-[#2B1F39] text-[#DFEFE9] px-4 rounded-lg text-xs font-['Montserrat']! font-bold! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors">
                    OK
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setShowCategoryInput(!showCategoryInput); setShowImageInput(false); }} 
                className="flex items-center gap-2 px-4 py-2 border border-[#2B1F39]/15 rounded-xl bg-white text-[#2B1F39] hover:bg-[#2B1F39]/5 font-['Roboto']! font-bold! text-sm! transition-colors shadow-sm"
              >
                <Layout size={16} />
                {category ? `Category: ${category}` : "Set Category"}
              </button>
              {showCategoryInput && (
                <div className="absolute top-full mt-3 left-0 bg-white p-3 rounded-xl border border-[#2B1F39]/10 shadow-lg z-20 w-56 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full bg-[#2B1F39]/5 border border-[#2B1F39]/15 rounded-lg px-3 py-2.5 text-sm font-['Roboto']! focus:outline-none focus:border-[#2B1F39]/30 cursor-pointer"
                  >
                    <option value="Essays">Essays</option>
                    <option value="Short Read">Short Read</option>
                    <option value="Thought Pieces">Thought Pieces</option>
                    <option value="Dev Log">Dev Log</option>
                    <option value="Travel">Travel</option>
                  </select>
                  <button onClick={() => setShowCategoryInput(false)} className="bg-[#2B1F39] w-full text-[#DFEFE9] px-4 py-2 rounded-lg text-xs font-['Montserrat']! font-bold! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors">
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor Toolbar and Textarea */}
        <div className="bg-white/50 rounded-3xl border border-[#2B1F39]/10 shadow-sm flex flex-col overflow-hidden">
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-3 border-b border-[#2B1F39]/10 bg-white/40">
             <div className="flex items-center gap-1 pr-3 border-r border-[#2B1F39]/10">
                <button onClick={() => insertFormatting('# ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Heading">
                  <Heading size={18} />
                </button>
                <button onClick={() => insertFormatting('**bold**')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Bold">
                  <Bold size={18} />
                </button>
                <button onClick={() => insertFormatting('_italic_')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Italic">
                  <Italic size={18} />
                </button>
                <button onClick={() => insertFormatting('<u>underline</u>')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Underline">
                  <Underline size={18} />
                </button>
             </div>
             
             <div className="flex items-center gap-1 px-3 border-r border-[#2B1F39]/10">
                <button onClick={() => insertFormatting('- ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Bullet List">
                  <List size={18} />
                </button>
                <button onClick={() => insertFormatting('1. ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Numbered List">
                  <ListOrdered size={18} />
                </button>
             </div>
             
             <div className="flex items-center gap-1 pl-3">
                <button onClick={() => insertFormatting('> ')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Quote">
                  <Quote size={18} />
                </button>
                <button onClick={() => insertFormatting('[Link](url)')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Link">
                  <LinkIcon size={18} />
                </button>
                <button onClick={() => insertFormatting('`code`')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Code">
                  <Code size={18} />
                </button>
                <button onClick={() => insertFormatting('![Image](url)')} className="p-2 text-[#2B1F39]/60 hover:text-[#2B1F39] hover:bg-white rounded-lg transition-colors" title="Image">
                  <ImageIcon size={18} />
                </button>
             </div>
          </div>
          
          <textarea
            placeholder="Write your story here... (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[500px] p-8 lg:p-10 bg-transparent border-0 font-['Roboto']! text-lg! sm:text-[1.15rem]! leading-[1.8]! text-[#2B1F39]! placeholder-[#2B1F39]/30 focus:outline-none focus:ring-0 resize-y"
          />
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
