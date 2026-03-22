import { useEffect } from "react";
import { Link } from "react-router-dom";
import Rellax from "rellax";
import { motion } from "motion/react";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

import CurvedLoop from "../ui/CurvedLoop";
import BlurText from "../ui/BlurText";
import ShinyText from "../ui/ShinyText";
import TextPressure from "../ui/TextPressure";
import ProfileCard from "../ui/ProfileCard";
import ScrollVelocity from "../ui/ScrollVelocity";
import BlogGrid from "../components/BlogGrid";
import Footer from "../components/Footer";
import StoryGrid from "../components/StoryGrid";

/* ── smooth entrance orchestration ── */
const ease = [0.22, 1, 0.36, 1]; // easeOutQuint

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.12 * i },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease, delay: 0.55 },
  },
};

const navReveal = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.08 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

function Home() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  useEffect(() => {
    const rellax = new Rellax(".rellax", {
      speed: -3,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false,
    });

    return () => {
      rellax.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden w-full">
      <section className="hero-section relative min-h-screen w-full">
        <div className="absolute inset-0 z-0">
          <Background />
        </div>

        <div className="absolute top-16 -left-20 z-5 w-full origin-left -rotate-12 md:top-20 md:-left-60 md:-rotate-20">
          <CurvedLoop
            marqueeText="This ✦ is ✦ where ✦ I ✦ build, ✦ learn, ✦ fail, ✦ and ✦ repeat — publicly. ✦"
            speed={2}
            curveAmount={600}
            direction="left"
            interactive={true}
            className="underline text-[#2B1F39]"
          />
        </div>

        <motion.div
          className="relative z-20"
          variants={navReveal}
          initial="hidden"
          animate="visible"
        >
          <Navbar />
        </motion.div>

        <div className="relative z-10 flex items-center justify-center pt-32 md:pt-32 max-w-7xl mx-auto">
          <div className="hero-section-head overflow-hidden md:rounded-[2.5rem] bg-[#2B1F39] px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 pt-16 md:pt-20 pb-16 md:pb-20 flex items-center justify-center shadow-md border border-[#DFEFE9]/10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center lg:items-center w-full">
              <div className="text-box flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <ShinyText
                    text="Hey, welcome to my space!"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                    style={{
                      color: "#DFEFE9",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "clamp(1.75rem, 4vw, 3rem)",
                      opacity: 1,
                      lineHeight: "1.2",
                      fontWeight: 300,
                      textAlign: "inherit",
                    }}
                  />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <ShinyText
                    text="I'm Divyam"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                    style={{
                      color: "#DFEFE9",
                      fontFamily: "Montserrat, sans-serif",
                      fontOpticalSizing: "auto",
                      fontWeight: "bold",
                      fontStyle: "normal",
                      fontSize: "clamp(2.75rem, 12vw, 7rem)",
                      lineHeight: "1.05",
                      textAlign: "inherit",
                      whiteSpace: "nowrap",
                      marginTop: "1.5rem",
                      marginBottom: "1rem",
                      opacity: 1,
                    }}
                  />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <ShinyText
                    text="I write what I learn, and what I live."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                    style={{
                      color: "#DFEFE9",
                      opacity: 0.75,
                      fontFamily: "Montserrat, sans-serif",
                      fontOpticalSizing: "auto",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
                      lineHeight: "1.3",
                      textAlign: "inherit",
                    }}
                  />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <ShinyText
                    text="I use this space to share what I'm learning, building, and thinking about—sometimes technical, sometimes personal. You'll find notes from my journey, lessons from building things, and thoughts that didn't fit neatly anywhere else."
                    disabled={false}
                    speed={3}
                    className=""
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontOpticalSizing: "auto",
                      fontWeight: 150,
                      fontStyle: "normal",
                      fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                      lineHeight: "1.7",
                      textAlign: "inherit",
                      color: "#DFEFE9",
                      opacity: 0.85,
                      marginTop: "1.5rem",
                    }}
                  />
                </motion.div>
                <motion.div
                  className="cta-container flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-10"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <Link to="https://divyamsingh.me/" className="w-full sm:w-auto">
                    <button className="line-btn w-full sm:w-auto px-8 sm:px-10">
                      <h6 className="italic">Portfolio</h6>
                    </button>
                  </Link>
                  <a href="#blogs" className="w-full sm:w-auto">
                    <button className="line-btn w-full sm:w-auto px-8 sm:px-10">
                      <h6 className="italic">To The Blogs</h6>
                    </button>
                  </a>
                </motion.div>
              </div>
              <motion.div
                className="img-box rellax hidden lg:block w-full max-w-[340px] md:max-w-[420px] mx-auto lg:w-auto shrink-0"
                data-rellax-speed="-3"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
              >
                <ProfileCard
                  name="Divyam Singh"
                  title="Thinking in components"
                  handle=""
                  status=""
                  contactText="Contact Me"
                  avatarUrl="/Divyam.jpeg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => console.log("Contact clicked")}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <motion.section
        id="blogs"
        className="blog-section px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-10 md:pt-16 lg:pt-20 pb-10 md:pb-14 lg:pb-20"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <h1 style={{ margin: 0 }}>
          <div
            style={{
              position: "relative",
              height: "auto",
              textDecoration: "none",
            }}
          >
            <TextPressure
              text="From My Desk!
              To You!!"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={false}
              italic={true}
              textColor="#2B1F39"
              strokeColor="#ff0000"
              minFontSize={42}
            />
          </div>
        </h1>
        <hr
          style={{
            marginTop: 0,
            marginBottom: "clamp(1rem, 2.5vw, 2rem)",
            borderColor: "rgba(43,31,57,0.15)",
          }}
        />
        <BlurText
          text="Things I’m Figuring Out"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className=""
          style={{
            color: "#2B1F39",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontOpticalSizing: "auto",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 5vw + 0.8rem, 5.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textAlign: "left",
            opacity: 1,
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        />
        <div className="blog-container relative w-full">
          <BlogGrid />
        </div>
      </motion.section>
      {/* <section className="quote-section h-100">
        <div>
          <ScrollVelocity
            texts={["Read Carefully -", "What you read here has been lived first."]}
            velocity={80}
            className="text-[#2B1F39] opacity-85 "
          />
        </div>
      </section> */}
      {/* <section
        id="story"
        className="story-section px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-4 md:pt-6 lg:pt-10 pb-6 md:pb-8 lg:pb-12"
      >
        <BlurText
          text="Travel-ish Thoughts"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className=""
          style={{
            color: "#2B1F39",
            fontFamily: "Montserrat, sans-serif",
            fontOpticalSizing: "auto",
            fontWeight: "bold",
            fontStyle: "normal",
            fontSize: "clamp(2.25rem, 5vw + 1rem, 5.6rem)",
            lineHeight: "144px",
            textAlign: "left",
            opacity: 1,
          }}
        />
        <div className="blog-container relative w-full">
          <StoryGrid />
        </div>
        <hr />
      </section> */}
      <Footer />
    </div>
  );
}

export default Home;
