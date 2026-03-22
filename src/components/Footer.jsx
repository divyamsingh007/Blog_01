import React from "react";
import { Link } from "react-router-dom";
import TextPressure from "../ui/TextPressure";
import BlurText from "../ui/BlurText";

const socials = [
  { label: "Twitter", href: "https://x.com/DivSingh2006?t=OA4u2w-u7Xkt17R9KpYTkQ&s=09" },
  { label: "GitHub", href: "https://github.com/divyamsingh007" },
  { label: "Instagram", href: "https://www.instagram.com/btwimdivyam/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divyam-singh-duhoon-0010211bb/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-[#DFEFE9] px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6 pt-16">
      <footer className="relative bg-[#2B1F39] pt-28 overflow-hidden rounded-t-[3rem] md:rounded-t-[6rem] lg:rounded-t-[8rem] rounded-b-[2rem] border border-[#2B1F39]/10 shadow-[0_-20px_40px_rgba(43,31,57,0.05)]">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between mb-16 gap-12 ">
        <div className="flex-1">
          <div className="font-['Bricolage_Grotesque']! font-bold! tracking-tight!">
            <BlurText
              text="Let's build something"
              delay={50}
              animateBy="words"
              direction="top"
            className="!text-[#DFEFE9] font-['Bricolage_Grotesque']! font-bold! text-5xl md:text-7xl lg:text-[5rem]! leading-[0.9]! tracking-tight !opacity-100"
            />
            <BlurText
              text="worth talking about."
              delay={100}
              animateBy="words"
              direction="top"
            className="!text-[#DFEFE9] font-['Bricolage_Grotesque']! font-bold! text-4xl md:text-6xl lg:text-[4rem]! leading-[0.9]! -mt-2 md:-mt-4 italic !opacity-100"
            />
          </div>
          <p className="mt-6 text-left! !text-[#DFEFE9] font-['Roboto']! text-[clamp(0.95rem,2.5vw,1.1rem)]! max-w-3xl leading-[1.7]! !opacity-100">
            Exploring the boundaries of code and design. Open to ambitious projects, collaborations, or a great conversation.
          </p>
        </div>

        {/* Massive dynamic navigation links */}
        <div className="flex flex-col gap-4 items-start md:items-end mt-12 md:mt-4">
          <Link to="/" className="group">
            <h6 className="font-['Bricolage_Grotesque']! font-bold text-[clamp(1.75rem,5vw,2.5rem)]! italic text-[#DFEFE9]/60 group-hover:text-[#DFEFE9] transition-all duration-300 flex items-center gap-4 hover:translate-x-2 md:hover:-translate-x-2">
              Back to Home
              <span className="inline-block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
            </h6>
          </Link>
          <Link to="/blogs" className="group">
            <h6 className="font-['Bricolage_Grotesque']! font-bold text-[clamp(1.75rem,5vw,2.5rem)]! italic text-[#DFEFE9]/60 group-hover:text-[#DFEFE9] transition-all duration-300 flex items-center gap-4 hover:translate-x-2 md:hover:-translate-x-2">
              All Essays
              <span className="inline-block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
            </h6>
          </Link>
          <Link to="/admin" className="group">
            <h6 className="font-['Bricolage_Grotesque']! font-bold text-[clamp(1.75rem,5vw,2.5rem)]! italic text-[#DFEFE9]/60 group-hover:text-[#DFEFE9] transition-all duration-300 flex items-center gap-4 hover:translate-x-2 md:hover:-translate-x-2">
              Admin / Login
              <span className="inline-block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
            </h6>
          </Link>
        </div>
      </div>

      {/* Social Links matching line-btn styling */}
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-5 mb-24 lg:px-12">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="relative group">
            {/* Brutalist offset shadow */}
            <div className="absolute inset-0 bg-[#DFEFE9] rounded-full translate-y-1 translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <button className="relative px-7 py-3.5 border-2 border-[#DFEFE9] bg-[#2B1F39] text-[#DFEFE9] rounded-full transition-transform duration-300 font-['Montserrat'] font-bold text-xs tracking-widest uppercase group-hover:-translate-y-1 group-hover:-translate-x-1 shadow-sm cursor-pointer">
              {s.label}
            </button>
          </a>
        ))}
      </div>

      {/* Very bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-6 px-6 lg:px-12 border-t border-[#DFEFE9]/10 bg-[#2B1F39]">
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-['Montserrat']! font-bold text-[0.65rem] uppercase tracking-widest text-[#DFEFE9]/50 hover:text-[#DFEFE9] transition-colors flex items-center gap-2"
        >
          Back to top
          <span className="w-6 h-6 rounded-full border border-[#DFEFE9]/20 flex items-center justify-center">↑</span>
        </button>
      </div>
    </footer>
    </div>
  );
}
