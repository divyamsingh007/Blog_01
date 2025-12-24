import { useEffect } from "react";
import { Link } from "react-router-dom";
import Rellax from "rellax";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

import CurvedLoop from "../ui/CurvedLoop";
import BlurText from "../ui/BlurText";
import ShinyText from "../ui/ShinyText";
import TextPressure from "../ui/TextPressure";
import ProfileCard from "../ui/ProfileCard";

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
    <>
      <section className="hero-section relative min-h-screen">
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

        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex items-center justify-center pt-32 md:pt-32 max-w-7xl mx-auto">
          <div className="hero-section-head overflow-hidden md:rounded-3xl bg-[#2B1F39] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-4 md:pt-6 lg:pt-10 pb-6 md:pb-8 lg:pb-12 flex items-center justify-center">
            <div className="flex flex-row gap-10">
              <div className="text-box">
                <BlurText
                  text="Hey, welcome to my space!"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className=""
                  style={{
                    color: "#DFEFE9",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "50.52px",
                    opacity: 1,
                    lineHeight: "62px",
                    fontWeight: 300,
                  }}
                />
                <BlurText
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
                    fontSize: "clamp(2.25rem, 5vw + 1rem, 5.6rem)",
                    lineHeight: "144px",
                    textAlign: "left",
                    opacity: 1,
                  }}
                />
                <BlurText
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
                    fontSize: "clamp(1.125rem, 2.2vw + 0.4rem, 2.37rem)",
                    lineHeight: "1.25",
                    textAlign: "left",
                  }}
                />
                <ShinyText
                  text="I use this space to share what I’m learning, building, and thinking about—sometimes technical, sometimes personal. You’ll find notes from my journey, lessons from building things, and thoughts that didn’t fit neatly anywhere else."
                  disabled={false}
                  speed={3}
                  className=""
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontOpticalSizing: "auto",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "clamp(1.1rem, 1.3vw, 1.3125rem)",
                    lineHeight: "1.625",
                    textAlign: "left",
                    color: "#DFEFE9",
                    opacity: 1,
                    marginTop: "clamp(14px, 1.2vw, 16px)",
                  }}
                />
                <div className="cta-container flex gap-6">
                  <Link to="https://divyamsingh.me/">
                    <button className="line-btn">
                      <h6 className="italic">Portfolio</h6>
                    </button>
                  </Link>
                  <Link to="#">
                    <button className="line-btn">
                      <h6 className="italic">To The Blogs</h6>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="img-box rellax" data-rellax-speed="-3">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-section px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-4 md:pt-6 lg:pt-10 pb-6 md:pb-8 lg:pb-12 h-1000">
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
        <hr style={{ marginTop: 0 }} />
        <BlurText
                  text="Things I’m Figuring Out"
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
      </section>
    </>
  );
}

export default Home;
