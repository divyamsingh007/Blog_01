import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import ShinyText from "../ui/ShinyText";
import LiquidEther from "../ui/LiquidEther";
import DotGrid from "../ui/DotGrid";

const ease = [0.22, 1, 0.36, 1];

const navReveal = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.08 },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay },
  },
});

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

const allPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=900&q=80",
    title: "Boxing icon has the will for a couple more fights",
    description:
      "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
    link: "/article/1",
    category: "Sports",
    readTime: "4 min read",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    title: "The Art of Writing Clean, Maintainable Code",
    description:
      "Good code reads like prose. Here's how to write code your future self will thank you for — and your teammates will actually enjoy reviewing.",
    link: "/article/2",
    category: "Engineering",
    readTime: "6 min read",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    title: "Lessons from Shipping My First Open Source Project",
    description:
      "What I learned about documentation, community, and the hidden emotional labor of maintaining a project others depend on.",
    link: "/article/3",
    category: "Open Source",
    readTime: "8 min read",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
    title: "Why I Switched to a Minimalist Dev Setup",
    description:
      "Less tooling, more focus. How stripping down my workflow pushed me to build faster and think clearer about what actually matters.",
    link: "/article/4",
    category: "Productivity",
    readTime: "5 min read",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    title: "Exploring the Edges of Frontend Performance",
    description:
      "Tiny gains compound. A deep dive into rendering pipelines, lazy hydration, and the subtle art of making things feel instant.",
    link: "/article/5",
    category: "Frontend",
    readTime: "7 min read",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    title: "Design Systems That Actually Scale",
    description:
      "Most design systems break at 50 components. Here's how to architect one that survives the chaos of real product development.",
    link: "/article/6",
    category: "Design",
    readTime: "9 min read",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    title: "The Quiet Power of Consistent Habits",
    description:
      "Forget motivation. The people who ship the most are the ones who show up when it's boring. A note on discipline over inspiration.",
    link: "/article/7",
    category: "Personal",
    readTime: "4 min read",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80",
    title: "Understanding Modern CSS Architecture",
    description:
      "From utility-first to CSS-in-JS and back again — navigating the constantly evolving landscape of styling on the web.",
    link: "/article/8",
    category: "CSS",
    readTime: "6 min read",
  },
];

function GlowOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-150 h-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(43,31,57,0.06) 0%, rgba(43,31,57,0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/3 -left-60 w-125 h-125 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,180,216,0.04) 0%, rgba(43,31,57,0.02) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute -bottom-32 right-1/4 w-112.5 h-112.5 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(43,31,57,0.05) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}

function HeaderSection() {
  const postCount = allPosts.length;

  return (
    <section className="relative overflow-hidden bg-[#2B1F39]" style={{ minHeight: "75vh" }}>
      {/* LiquidEther background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#1a1028", "#2B1F39", "#3d2a54"]}
          mouseForce={8}
          cursorSize={150}
          isViscous
          viscous={50}
          iterationsViscous={48}
          iterationsPoisson={48}
          resolution={0.4}
          dt={0.01}
          isBounce={false}
          autoDemo
          autoSpeed={0.2}
          autoIntensity={1.2}
          takeoverDuration={0.5}
          autoResumeDelay={2000}
          autoRampDuration={1.2}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlay for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,31,57,0.25) 0%, rgba(43,31,57,0.1) 40%, rgba(43,31,57,0.45) 100%)",
        }}
      />

      {/* Giant watermark */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-1 select-none overflow-hidden">
        <p
          className="whitespace-nowrap text-center leading-none tracking-[-0.04em]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(8rem, 22vw, 22rem)",
            color: "transparent",
            WebkitTextStroke: "6px rgba(224,240,234,0.025)",
            margin: 0,
            transform: "translateY(32%)",
          }}
        >
          WRITINGS
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-16 pt-48 sm:pt-52 md:pt-56 lg:pt-64 pb-20 sm:pb-24 md:pb-28 lg:pb-32">        

        {/* Title */}
        <motion.div
          variants={fadeUp(0.16)}
          initial="hidden"
          animate="visible"
        >
          <ShinyText
            text="All Writings"
            speed={4}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: "clamp(3.5rem, 9vw + 0.5rem, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: "#E0F0EA",
              textAlign: "center",
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={fadeUp(0.26)}
          initial="hidden"
          animate="visible"
          className="mt-6 md:mt-10 max-w-xl mx-auto"
        >
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "#E0F0EA",
              opacity: 0.4,
              textAlign: "center",
              letterSpacing: "0.01em",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Notes, lessons &amp; half-formed thoughts from
            <br className="hidden sm:block" />
            {" "}building things and figuring life out
            <span style={{ opacity: 0.6 }}> — </span>
            one post at a time.
          </p>
        </motion.div>

        {/* Back home pill */}
        <motion.div
          variants={fadeUp(0.34)}
          initial="hidden"
          animate="visible"
          className="mt-10 md:mt-14"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 rounded-full border border-[#E0F0EA]/15 px-5 py-2.5 overflow-hidden transition-all duration-500 hover:border-[#E0F0EA]/35 hover:shadow-[0_0_20px_rgba(224,240,234,0.06)]"
          >
            {/* hover fill */}
            <span className="absolute inset-0 rounded-full bg-[#E0F0EA]/0 group-hover:bg-[#E0F0EA]/8 transition-all duration-500 ease-out" />

            <ArrowLeft
              size={13}
              className="relative z-10 text-[#E0F0EA]/40 group-hover:text-[#E0F0EA]/80 transition-all duration-500 group-hover:-translate-x-0.5"
            />
            <span
              className="relative z-10 text-[#E0F0EA]/40 group-hover:text-[#E0F0EA]/80 transition-colors duration-500"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Back home
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const filters = [
  {
    key: "all",
    label: "All",
    description: "Everything in one place",
  },
  {
    key: "blogs",
    label: "Blogs",
    description: "Deep dives & detailed walkthroughs",
  },
  {
    key: "essays",
    label: "Essays",
    description: "Long-form reflections & arguments",
  },
  {
    key: "short-reads",
    label: "Short Reads",
    description: "Quick takes under 3 minutes",
  },
  {
    key: "thought-pieces",
    label: "Thought Pieces",
    description: "Ideas still finding their shape",
  },
];

export default function AllBlogs() {
  const [activeFilter, setActiveFilter] = useState("all");
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <div className="relative min-h-screen bg-[#E0F0EA]">
      <GlowOrbs />

      <motion.div
        className="relative z-20"
        variants={navReveal}
        initial="hidden"
        animate="visible"
      >
        <Navbar
          baseColor="#E0F0EA"
          menuColor="#2B1F39"
          buttonBgColor="#2B1F39"
          buttonTextColor="#E0F0EA"
          logoTextColor="#2B1F39"
        />
      </motion.div>

      {/* Hero header — full bleed edge-to-edge */}
      <div className="relative z-10">
        <HeaderSection />
      </div>

      {/* Fixed DotGrid background — screen height, stays behind grid */}
      <div className="fixed inset-0 h-screen w-full z-0 opacity-50">
        <DotGrid
          dotSize={5}
          gap={18}
          baseColor="#2B1F39"
          activeColor="#00B4D8"
          proximity={100}
          shockRadius={200}
          shockStrength={3}
          resistance={500}
          returnDuration={1.25}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <main className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-10 md:pt-14">

        {/* Filter section */}
        <motion.div
          variants={fadeUp(0.32)}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <div className="rounded-3xl bg-[#2B1F39] px-5 py-8 md:px-10 md:py-10 shadow-xl shadow-[#2B1F39]/20">
            {/* Filter cards — horizontal row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {filters.map((f) => {
                const isActive = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`relative text-left cursor-pointer rounded-2xl p-5 md:p-6 transition-all duration-500 overflow-hidden group ${
                      isActive ? "" : "hover:bg-[#E0F0EA]/6"
                    }`}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(224,240,234,0.14) 0%, rgba(224,240,234,0.05) 100%)"
                        : undefined,
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {/* Left accent bar */}
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-full transition-all duration-500 group-hover:h-[35%]"
                      style={{
                        height: isActive ? "60%" : "0%",
                        background: isActive
                          ? "#E0F0EA"
                          : "rgba(224,240,234,0.3)",
                      }}
                    />

                    {/* Number */}
                    <span
                      className="block mb-4 transition-all duration-500"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        lineHeight: 1,
                        color: isActive
                          ? "#E0F0EA"
                          : "rgba(224,240,234,0.12)",
                      }}
                    >
                      <span className="group-hover:text-[#E0F0EA]/40 transition-colors duration-500">
                        0{filters.indexOf(f) + 1}
                      </span>
                    </span>

                    {/* Label */}
                    <span
                      className={`block mb-2 transition-colors duration-500 ${
                        isActive ? "" : "group-hover:text-[#E0F0EA]/75"
                      }`}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.88rem",
                        fontWeight: 800,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: isActive
                          ? "#E0F0EA"
                          : "rgba(224,240,234,0.5)",
                      }}
                    >
                      {f.label}
                    </span>

                    {/* Description */}
                    <span
                      className={`block transition-colors duration-500 ${
                        isActive ? "" : "group-hover:text-[#E0F0EA]/40"
                      }`}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 350,
                        lineHeight: 1.6,
                        fontStyle: "italic",
                        color: isActive
                          ? "rgba(224,240,234,0.55)"
                          : "rgba(224,240,234,0.25)",
                      }}
                    >
                      {f.description}
                    </span>

                    {/* Hover glow — site mint color */}
                    <span
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 20% 30%, rgba(224,240,234,0.07) 0%, transparent 65%)",
                      }}
                    />

                    {/* Bottom edge shimmer on hover */}
                    <span
                      className="absolute bottom-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(224,240,234,0.2), transparent)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured post — full width hero */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <BlogCard
            image={featured.image}
            title={featured.title}
            description={featured.description}
            link={featured.link}
          />
        </motion.div>

        {/* Row 2 — asymmetric 7 / 5 */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4"
        >
          <motion.div variants={cardItem} className="md:col-span-7">
            <BlogCard
              image={rest[0].image}
              title={rest[0].title}
              description={rest[0].description}
              link={rest[0].link}
              compact
            />
          </motion.div>
          <motion.div variants={cardItem} className="md:col-span-5">
            <BlogCard
              image={rest[1].image}
              title={rest[1].title}
              description={rest[1].description}
              link={rest[1].link}
              compact
            />
          </motion.div>
        </motion.div>

        {/* Row 3 — three equal */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {rest.slice(2, 5).map((post) => (
            <motion.div key={post.id} variants={cardItem}>
              <BlogCard
                image={post.image}
                title={post.title}
                description={post.description}
                link={post.link}
                compact
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Row 4 — asymmetric 5 / 7 (inverted rhythm) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4"
        >
          <motion.div variants={cardItem} className="md:col-span-5">
            <BlogCard
              image={rest[5].image}
              title={rest[5].title}
              description={rest[5].description}
              link={rest[5].link}
              compact
            />
          </motion.div>
          <motion.div variants={cardItem} className="md:col-span-7">
            <BlogCard
              image={rest[6].image}
              title={rest[6].title}
              description={rest[6].description}
              link={rest[6].link}
              compact
            />
          </motion.div>
        </motion.div>
      </main>

      <div className="mt-16 md:mt-24">
        <Footer />
      </div>
    </div>
  );
}
