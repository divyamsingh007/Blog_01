import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { marked } from "marked";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost({
          ...data,
          date: new Date(data.createdAt || data.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // Check local storage for like status
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        setIsLiked(likedPosts.includes(id));
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    let newLikedPosts;
    if (isLiked) {
      newLikedPosts = likedPosts.filter(postId => postId !== id);
    } else {
      newLikedPosts = [...likedPosts, id];
    }
    localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
    setIsLiked(!isLiked);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this article: ${post.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  if (!post) return <div className="min-h-screen bg-[#DFEFE9]" />;

  return (
    <section className="relative min-h-screen bg-[#DFEFE9] selection:bg-[#2B1F39] selection:text-[#DFEFE9] overflow-x-hidden">
      {/* Navbar overlay */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Absolute Top-Left Back Button */}
      <div className="absolute top-[112px] md:top-[112px] left-4 sm:left-6 md:left-10 z-[100]">
        <Link
          to="/blogs"
          className="group inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border border-[#2B1F39]/10 bg-white/40 backdrop-blur-xl shadow-sm text-[#2B1F39]/70 hover:text-[#2B1F39] hover:border-[#2B1F39]/25 hover:bg-white/80 hover:shadow-md transition-all duration-300 font-['Montserrat']! text-[0.65rem]! uppercase! tracking-widest! font-bold!"
        >
          <div className="bg-[#2B1F39] text-[#DFEFE9] w-7 h-7 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          Back to Articles
        </Link>
      </div>

      <main className="relative z-10 pt-36 md:pt-44 pb-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Post Header */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 mt-6 md:mt-4 text-left"
        >
          <div className="flex flex-wrap items-center justify-start gap-4 text-[#2B1F39]/60 font-['Roboto']! text-[0.7rem]! font-bold! tracking-widest! uppercase! mb-8">
            <span className="px-3.5 py-1.5 bg-white/50 border border-[#2B1F39]/10 rounded-full font-['Montserrat']! text-xs! text-[#2B1F39] shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 className="text-[2.5rem]! sm:text-5xl! md:text-6xl! lg:text-[4.5rem]! font-['Bricolage_Grotesque']! font-black! text-[#2B1F39]! tracking-[-0.03em]! leading-[1.05]! mb-8 text-left text-balance">
            {post.title}
          </h1>

          <div className="max-w-3xl">
            <p className="text-[#2B1F39]/70! font-['Roboto']! text-xl! md:text-2xl! leading-[1.6]! tracking-[0.01em]! font-light border-l-2 border-[#2B1F39]/20 pl-6 text-left">
              {post.description}
            </p>
          </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-lg bg-[#2B1F39]/5 border border-[#2B1F39]/5"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </motion.div>

        {/* Article Body */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-none mb-24 text-left
            text-[#2B1F39]/80 font-['Roboto']! text-lg sm:text-[1.3rem] leading-[1.9]! tracking-[0.01em]!
            [&>p]:mb-10 [&>p]:text-left
            [&>h2]:font-['Bricolage_Grotesque']! [&>h2]:text-3xl [&>h2]:sm:text-4xl [&>h2]:font-bold [&>h2]:text-[#2B1F39] [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:tracking-tight [&>h2]:text-left
            [&>h3]:font-['Bricolage_Grotesque']! [&>h3]:text-2xl [&>h3]:sm:text-3xl [&>h3]:font-bold [&>h3]:text-[#2B1F39] [&>h3]:mt-14 [&>h3]:mb-6 [&>h3]:tracking-tight [&>h3]:text-left
            [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-10 [&>ul>li]:mb-4 [&>ul>li]:relative [&>ul>li]:pl-8 [&>ul>li]:text-left
            [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.75rem] [&>ul>li::before]:w-2.5 [&>ul>li::before]:h-2.5 [&>ul>li::before]:bg-[#2B1F39]/20 [&>ul>li::before]:rounded-full
            [&>ol]:list-decimal [&>ol]:pl-10 [&>ol]:mb-10 [&>ol>li]:mb-4 [&>ol>li]:text-left
            [&>blockquote]:border-l-3 [&>blockquote]:border-[#2B1F39] [&>blockquote]:bg-white/40 [&>blockquote]:backdrop-blur-sm [&>blockquote]:pl-10 [&>blockquote]:pr-8 [&>blockquote]:py-10 [&>blockquote]:mb-14 [&>blockquote]:rounded-r-3xl [&>blockquote]:text-[#2B1F39] [&>blockquote]:italic [&>blockquote]:font-['Bricolage_Grotesque']! [&>blockquote]:text-3xl [&>blockquote]:leading-tight [&>blockquote]:shadow-sm [&>blockquote]:text-left
            [&>strong]:font-bold [&>strong]:text-[#2B1F39]
            [&>code]:bg-[#2B1F39]/5 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-[#2B1F39] [&>code]:text-[0.9em] [&>code]:font-mono"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        />

        {/* Gallery Integrated into Blog Content */}
        {post.relatedImages && post.relatedImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-none mb-16 pt-8 border-t border-[#2B1F39]/10"
          >
            <div className="mb-8">
              <h3 className="font-['Bricolage_Grotesque']! text-3xl! font-bold! text-[#2B1F39]! tracking-tight!">
                Gallery
              </h3>
            </div>
            <div className={`grid gap-4 sm:gap-6 ${post.relatedImages.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-2'}`}>
              {post.relatedImages.map((imgUrl, i) => (
                <div key={i} className="group relative aspect-square sm:aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#2B1F39]/5 shadow-sm transform-gpu transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B1F39]/10">
                  <img 
                    src={imgUrl} 
                    alt={`Gallery Image ${i + 1}`} 
                    className="object-cover w-full h-full transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-[1.5rem] border-[3px] border-white/0 group-hover:border-white/20 transition-colors duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#2B1F39]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer actions (Share, Author) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-t border-[#2B1F39]/10 mt-12 gap-8"
        >
          {/* Author Block */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-[#2B1F39]/5 ring-4 ring-white shadow-[0_4px_20px_rgba(43,31,57,0.06)] relative group">
              <img src="/Divyam.jpeg" alt={post.author} className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-['Montserrat']! font-bold! text-[#2B1F39]/50! text-[0.65rem]! uppercase! tracking-[0.2em]! mb-1.5 flex items-center gap-2.5">
                <span className="w-5 h-[2px] bg-[#2B1F39]/20 rounded-full" />
                Written by
              </p>
              <p className="font-['Bricolage_Grotesque']! font-black! text-[1.4rem]! sm:text-[1.5rem]! text-[#2B1F39]! tracking-tight! leading-none!">
                {post.author}
              </p>
            </div>
          </div>

          {/* Share & Like Actions */}
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <p className="font-['Montserrat']! font-bold! text-[#2B1F39]/40! text-[0.65rem]! uppercase! tracking-[0.2em]! ml-2 md:ml-0 mb-1">
              Engage & Share
            </p>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-[#2B1F39]/5 shadow-sm">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 pointer-events-auto ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-[#2B1F39]/70 hover:text-red-500'}`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
              
              <div className="h-6 w-[1px] bg-[#2B1F39]/10 mx-1" />

              <button 
                onClick={shareOnTwitter}
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/70 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 pointer-events-auto"
              >
                <Twitter size={15} />
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/70 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 pointer-events-auto"
              >
                <Linkedin size={15} />
              </button>
              <button 
                onClick={handleCopyLink}
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/70 hover:bg-[#2B1F39] hover:text-[#DFEFE9] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 relative group pointer-events-auto"
              >
                <Copy size={15} />
                <AnimatePresence>
                  {copied && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-12 bg-[#2B1F39] text-[#DFEFE9] text-[0.65rem] px-3.5 py-1.5 rounded-full font-['Montserrat']! font-bold! uppercase! tracking-widest! shadow-lg whitespace-nowrap z-50 pointer-events-none"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>


      </main>

      <div className="relative z-10 bg-[#DFEFE9]">
        <Footer />
      </div>
    </section>
  );
}
