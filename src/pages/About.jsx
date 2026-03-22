import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Construction } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen bg-[#DFEFE9] text-[#2B1F39] overflow-hidden selection:bg-[#2B1F39] selection:text-[#DFEFE9]">
      {/* Navbar overlay */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white opacity-40 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-white opacity-40 blur-[120px] rounded-full"
        />
      </div>

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

      {/* Centered Content Wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          

          {/* Main Text */}
          <h1 className="relative">
            <span className="block font-['Bricolage_Grotesque']! text-[3.5rem]! sm:text-[5rem]! md:text-[6.5rem]! lg:text-[8rem]! font-black! text-[#2B1F39]! leading-[1]! tracking-[-0.04em]! mb-2">
              Currently
            </span>
            <span className="block font-['Bricolage_Grotesque']! text-[3.5rem]! sm:text-[5rem]! md:text-[6.5rem]! lg:text-[8rem]! font-black! text-[#2B1F39]! leading-[1]! tracking-[-0.04em]! relative">
              Working on it
              <motion.span 
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-8 -top-4 sm:-right-12 sm:-top-8 text-[#2B1F39]"
              >
              </motion.span>
            </span>
          </h1>          

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <Link 
              to="/blogs"
              className="px-10 py-4 bg-[#2B1F39] text-[#DFEFE9] rounded-full font-['Montserrat']! font-bold! text-[0.7rem]! uppercase! tracking-widest! hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#2B1F39]/20"
            >
              Check my Blogs instead
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Dots Section */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 overflow-hidden pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#2B1F39]"
          />
        ))}
      </div>
    </section>
  );
}
