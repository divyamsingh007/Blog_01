import Background from "../components/Background";
import Navbar from "../components/Navbar";
import CurvedLoop from "../ui/CurvedLoop";

function Home() {
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

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="hero-section-head overflow-hidden md:rounded-3xl bg-[#2B1F39] px-6 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-36 pt-6 md:pt-10 lg:pt-20 pb-8 md:pb-12 lg:pb-26">
            
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
