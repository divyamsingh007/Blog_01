import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollVelocity from "../ui/ScrollVelocity";
import TextPressure from "../ui/TextPressure";
import BlurText from "../ui/BlurText";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ───────────────────── sample data ───────────────────── */
const CATEGORIES = [
  "All",
  "Essays",
  "Short Read",
  "Thought Pieces",
  "Dev Log",
  "Travel",
];

const ALL_POSTS = Array.from({ length: 24 }, (_, i) => {
  const cats = CATEGORIES.slice(1);
  return {
    id: i + 1,
    image: [
      "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    ][i % 6],
    title: [
      "Building Resilient Systems with Modern Architecture",
      "The Art of Writing Clean, Maintainable Code",
      "Lessons from Shipping My First Open Source Project",
      "Why I Switched to a Minimalist Dev Setup",
      "Debugging in Production: War Stories & Wisdom",
      "Exploring the Edges of Frontend Performance",
    ][i % 6] + (i >= 6 ? ` — Part ${Math.floor(i / 6) + 1}` : ""),
    description:
      "A deep-dive into the thinking, trade-offs, and late-night debugging sessions that shaped this piece of work. Read on to explore what I learned.",
    category: cats[i % cats.length],
    date: new Date(2026, 0, 25 - i).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: `${3 + (i % 7)} min read`,
    link: `/blog/${i + 1}`,
  };
});

/* ───────────────────── component ───────────────────── */
export default function AllBlogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // 1 featured + 9 regular on first page, 10 regular thereafter

  /* filter + search */
  const filtered = useMemo(() => {
    let list = ALL_POSTS;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => setCurrentPage(1), [activeCategory, searchQuery]);

  // animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section className="relative min-h-screen bg-[#DFEFE9] selection:bg-[#2B1F39] selection:text-[#DFEFE9] overflow-x-hidden">
      {/* Absolute Top-Left Back Button */}
      <div className="absolute top-6 md:top-10 left-4 sm:left-6 md:left-10 z-[60]">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border border-[#2B1F39]/10 bg-white/40 backdrop-blur-xl shadow-sm text-[#2B1F39]/70 hover:text-[#2B1F39] hover:border-[#2B1F39]/25 hover:bg-white/80 hover:shadow-md transition-all duration-300 font-['Montserrat']! text-[0.65rem]! uppercase! tracking-widest! font-bold!"
        >
          <div className="bg-[#2B1F39] text-[#DFEFE9] w-7 h-7 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          Back to Home
        </Link>
      </div>

      {/* Navbar overlay */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Header - Minimalist & Editorial */}
      <div className="relative z-10 pt-32 md:pt-40 pb-16 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Bricolage_Grotesque']! text-[5rem]! sm:text-[7rem]! md:text-[8.5rem]! lg:text-[11rem]! font-black! text-[#2B1F39]! tracking-[-0.04em]! leading-[0.85]! mb-6 md:mb-8 z-20"
        >
          The Archive.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mx-auto font-['Roboto']! text-lg! md:text-xl! text-[#2B1F39]/80! leading-[1.8]! tracking-[0.01em]! z-30"
        >
          A curated collection of my thoughts, technical explorations, and stories from the journey. Filter, search, and dive in.
        </motion.p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#DFEFE9]/90 backdrop-blur-xl border-y border-[#2B1F39]/10 py-5 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-['Montserrat']! px-4 py-2 rounded-full text-xs! font-bold! tracking-widest! uppercase! transition-all duration-300
                  ${
                    activeCategory === cat
                      ? "bg-[#2B1F39] text-[#DFEFE9] shadow-md shadow-[#2B1F39]/20 scale-105"
                      : "text-[#2B1F39]/60 border border-[#2B1F39]/15 hover:border-[#2B1F39]/40 hover:text-[#2B1F39]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-auto flex justify-center md:justify-end">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto", minWidth: "240px" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-2 bg-white/60 border border-[#2B1F39]/20 rounded-full px-4 py-2 shadow-inner lg:w-80"
                >
                  <Search size={16} className="text-[#2B1F39]/40 shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles…"
                    className="bg-transparent text-[#2B1F39] placeholder-[#2B1F39]/40 text-sm! outline-none w-full font-['Roboto']!"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-[#2B1F39]/40 hover:text-[#2B1F39] transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-[#2B1F39]/60 hover:text-[#2B1F39] border border-[#2B1F39]/15 hover:border-[#2B1F39]/40 rounded-full px-5 py-2 transition-all font-['Montserrat']! text-xs! font-bold! tracking-widest! uppercase! w-full md:w-auto justify-center"
                >
                  <Search size={14} />
                  Search
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 pt-16 pb-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Search size={48} className="text-[#2B1F39]/20 mb-6" />
            <p className="text-[#2B1F39]/50 text-xl font-['Montserrat']!">
              No articles match your criteria.
            </p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-6 text-[#2B1F39] underline decoration-[#2B1F39]/30 underline-offset-4 hover:decoration-[#2B1F39] transition-colors font-['Roboto']! font-medium!"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-12 sm:gap-16"
          >
            {/* Featured Post (only on page 1 and if not filtering heavily) */}
            {currentPage === 1 && !searchQuery && paginated.length > 0 && (
              <motion.div variants={itemVars}>
                <Link to={paginated[0].link} className="group block relative rounded-[2rem] overflow-hidden bg-white/40 border border-[#2B1F39]/5 hover:bg-white/60 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-[#2B1F39]/5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center">
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
                      <img 
                        src={paginated[0].image} 
                        alt={paginated[0].title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#DFEFE9]/95 text-[#2B1F39] backdrop-blur-md text-xs! font-bold! font-['Montserrat']! uppercase! tracking-widest! shadow-sm">
                          {paginated[0].category}
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-[#2B1F39]/95 text-[#DFEFE9] backdrop-blur-md text-xs! font-bold! font-['Montserrat']! uppercase! tracking-widest! shadow-sm flex items-center gap-1.5">
                          ✨ Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 lg:pr-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-[#2B1F39]/50 font-['Roboto']! text-[0.85rem]! tracking-wider! uppercase! font-semibold! mb-5">
                        <span className="flex items-center gap-1.5"><Calendar size={14}/> {paginated[0].date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><Clock size={14}/> {paginated[0].readTime}</span>
                      </div>
                      <h2 className="text-4xl! sm:text-5xl! lg:text-6xl! font-['Bricolage_Grotesque']! font-bold! text-[#2B1F39]! leading-[1.05]! tracking-tight! mb-6 group-hover:text-[#2B1F39]/70 transition-colors">
                        {paginated[0].title}
                      </h2>
                      <p className="text-[#2B1F39]/70! font-['Roboto']! text-xl! leading-[1.7]! mb-8">
                        {paginated[0].description}
                      </p>
                      <div className="inline-flex items-center gap-2 font-['Montserrat']! font-bold! text-[#2B1F39]! uppercase! tracking-widest! text-sm! transition-transform duration-300 group-hover:translate-x-1">
                        Read Article
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Standard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {paginated.slice(currentPage === 1 && !searchQuery ? 1 : 0).map((post) => (
                <motion.div key={post.id} variants={itemVars}>
                  <Link to={post.link} className="group flex flex-col h-full bg-white/20 hover:bg-white/50 p-3 rounded-[1.5rem] transition-colors duration-500 border border-transparent hover:border-[#2B1F39]/5 shadow-sm hover:shadow-lg hover:shadow-[#2B1F39]/5">
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[1rem] overflow-hidden mb-6 bg-[#2B1F39]/5">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#2B1F39]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#2B1F39] backdrop-blur-md text-[0.65rem]! font-bold! font-['Montserrat']! uppercase! tracking-widest! shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1 px-2 pb-2">
                      <div className="flex items-center gap-3 text-[#2B1F39]/50 font-['Roboto']! text-[0.75rem]! tracking-wide! uppercase! font-semibold! mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl! lg:text-[1.75rem]! font-['Bricolage_Grotesque']! font-bold! text-[#2B1F39]! leading-[1.15]! tracking-tight! mb-4 group-hover:text-[#2B1F39]/70 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-[#2B1F39]/60! font-['Roboto']! text-[1.05rem]! leading-[1.65]! mb-6 line-clamp-2 flex-1">
                        {post.description}
                      </p>
                      
                      <div className="mt-auto inline-flex items-center gap-1.5 font-['Montserrat']! font-bold! text-[#2B1F39]/70! group-hover:text-[#2B1F39]! uppercase! tracking-widest! text-[0.7rem]! transition-all">
                        Read More
                        <ArrowRight size={12} className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pagination Setup */}
        {totalPages > 1 && (
          <div className="mt-24 mb-10 flex justify-center items-center gap-6 md:gap-12" data-aos="fade-up">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="group flex items-center gap-3 text-[#2B1F39]/50 hover:text-[#2B1F39] font-['Montserrat']! text-xs! uppercase! tracking-widest! font-bold! transition-all disabled:opacity-30 disabled:hover:text-[#2B1F39]/50 disabled:cursor-not-allowed"
            >
              <div className="w-9 h-9 rounded-full border border-[#2B1F39]/10 bg-white/40 flex items-center justify-center group-hover:bg-[#2B1F39] group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-2 relative bg-white/30 backdrop-blur-md px-3 py-2 rounded-full border border-[#2B1F39]/5 shadow-sm">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-['Bricolage_Grotesque']! text-lg! sm:text-xl! transition-colors duration-300
                      ${
                        page === currentPage
                          ? "text-[#2B1F39] font-bold!"
                          : "text-[#2B1F39]/40 hover:text-[#2B1F39]"
                      }`}
                  >
                    {page === currentPage && (
                      <motion.div 
                        layoutId="active-page-pill" 
                        className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(43,31,57,0.06)] rounded-full border border-[#2B1F39]/10" 
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 tracking-tight!">{page}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-3 text-[#2B1F39]/50 hover:text-[#2B1F39] font-['Montserrat']! text-xs! uppercase! tracking-widest! font-bold! transition-all disabled:opacity-30 disabled:hover:text-[#2B1F39]/50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <div className="w-9 h-9 rounded-full border border-[#2B1F39]/10 bg-white/40 flex items-center justify-center group-hover:bg-[#2B1F39] group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Unique Scroll Marquee */}
      <div className="relative z-10 w-full overflow-hidden py-16 md:py-24 border-t border-[#2B1F39]/10 bg-white/20 backdrop-blur-lg">
        <ScrollVelocity
          texts={["Keep Exploring •", "Read The Archives •"]}
          velocity={50}
          className="text-[#2B1F39] opacity-90 font-['Bricolage_Grotesque']! tracking-tighter! uppercase!"
        />
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[#DFEFE9]">
        <Footer />
      </div>
    </section>
  );
}
