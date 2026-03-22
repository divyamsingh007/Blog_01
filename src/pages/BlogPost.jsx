import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy removed

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost({
          ...data,
          date: new Date(data.createdAt || data.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return <div className="min-h-screen bg-[#DFEFE9]" />;

  return (
    <section className="relative min-h-screen bg-[#DFEFE9] selection:bg-[#2B1F39] selection:text-[#DFEFE9] overflow-x-hidden">
      {/* Navbar overlay */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Absolute Top-Left Back Button */}
      <div className="absolute top-6 md:top-10 left-4 sm:left-6 md:left-10 z-[60]">
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
          className="mb-12 md:mb-16 mt-6 md:mt-4"
        >
          <div className="flex flex-wrap items-center gap-4 text-[#2B1F39]/60 font-['Roboto']! text-[0.7rem]! font-bold! tracking-widest! uppercase! mb-8">
            <span className="px-3.5 py-1.5 bg-white/50 border border-[#2B1F39]/10 rounded-full font-['Montserrat']! text-xs! text-[#2B1F39] shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 className="text-[2.5rem]! sm:text-5xl! md:text-6xl! lg:text-[4.5rem]! font-['Bricolage_Grotesque']! font-black! text-[#2B1F39]! tracking-[-0.03em]! leading-[1.05]! mb-8">
            {post.title}
          </h1>

          <p className="text-[#2B1F39]/70! font-['Roboto']! text-xl! md:text-2xl! leading-[1.65]! tracking-[0.01em]! font-light border-l-2 border-[#2B1F39]/20 pl-6">
            {post.description}
          </p>
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
          className="w-full max-w-none mb-24 
            text-[#2B1F39]/80 font-['Roboto']! text-lg sm:text-[1.25rem] leading-[1.85]! tracking-[0.01em]!
            [&>p]:mb-8 
            [&>h2]:font-['Bricolage_Grotesque']! [&>h2]:text-3xl [&>h2]:sm:text-4xl [&>h2]:font-bold [&>h2]:text-[#2B1F39] [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:tracking-tight
            [&>h3]:font-['Bricolage_Grotesque']! [&>h3]:text-2xl [&>h3]:sm:text-3xl [&>h3]:font-bold [&>h3]:text-[#2B1F39] [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:tracking-tight
            [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-8 [&>ul>li]:mb-4 [&>ul>li]:relative [&>ul>li]:pl-6
            [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.6rem] [&>ul>li::before]:w-2 [&>ul>li::before]:h-2 [&>ul>li::before]:bg-[#2B1F39]/30 [&>ul>li::before]:rounded-full
            [&>blockquote]:border-l-2 [&>blockquote]:border-[#2B1F39] [&>blockquote]:bg-white/40 [&>blockquote]:backdrop-blur-sm [&>blockquote]:pl-8 [&>blockquote]:pr-6 [&>blockquote]:py-6 [&>blockquote]:mb-10 [&>blockquote]:rounded-r-2xl [&>blockquote]:text-[#2B1F39] [&>blockquote]:italic [&>blockquote]:font-['Bricolage_Grotesque']! [&>blockquote]:text-2xl [&>blockquote]:shadow-sm
            [&>strong]:font-bold [&>strong]:text-[#2B1F39]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Small 4 Image Gallery - Integrated into Blog Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-none mb-16 pt-8 border-t border-[#2B1F39]/10"
        >
          <div className="mb-8">
            <h3 className="font-['Bricolage_Grotesque']! text-3xl! font-bold! text-[#2B1F39]! tracking-tight!">
              Related Images
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
            ].map((imgUrl, i) => (
              <div key={i} className="relative aspect-square sm:aspect-[4/5] rounded-[1.5rem] overflow-hidden group border border-[#2B1F39]/5 shadow-sm bg-[#2B1F39]/5">
                <img 
                  src={imgUrl} 
                  alt={`Related ${i + 1}`} 
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#2B1F39]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer actions (Share, Author) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between py-10 border-t border-[#2B1F39]/10 mt-10"
        >
          <div className="flex items-center gap-5 mb-8 sm:mb-0">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#2B1F39]/10 ring-4 ring-white/50 shadow-sm">
              <img src="/Divyam.jpeg" alt={post.author} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="font-['Montserrat']! font-bold! text-[#2B1F39]/50! text-[0.65rem]! uppercase! tracking-widest! mb-1">Written by</p>
              <p className="font-['Bricolage_Grotesque']! font-bold! text-xl! text-[#2B1F39]! tracking-tight!">{post.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-2 rounded-full border border-[#2B1F39]/10 shadow-sm">
            <span className="font-['Montserrat']! font-bold! text-[#2B1F39]/50! text-[0.65rem]! uppercase! tracking-widest! ml-3 mr-1">Share</span>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/80 hover:bg-[#2B1F39] hover:text-[#DFEFE9] transition-all shadow-sm">
              <Twitter size={14} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/80 hover:bg-[#2B1F39] hover:text-[#DFEFE9] transition-all shadow-sm">
              <Linkedin size={14} />
            </button>
            <button 
              onClick={handleCopyLink}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2B1F39]/80 hover:bg-[#2B1F39] hover:text-[#DFEFE9] transition-all shadow-sm relative group"
            >
              <Copy size={14} />
              <AnimatePresence>
                {copied && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-12 bg-[#2B1F39] text-[#DFEFE9] text-[0.65rem] px-3 py-1.5 rounded-full font-['Montserrat']! font-bold! uppercase! tracking-widest! shadow-md whitespace-nowrap"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>


      </main>

      <div className="relative z-10 bg-[#DFEFE9]">
        <Footer />
      </div>
    </section>
  );
}
