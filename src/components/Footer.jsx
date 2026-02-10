import React, { useRef, useEffect } from "react";

/* ─── social data ─── */
const socials = [
  {
    label: "Twitter",
    icon: "fa-brands fa-x-twitter",
    href: "https://x.com/DivSingh2006?t=OA4u2w-u7Xkt17R9KpYTkQ&s=09",
  },
  {
    label: "GitHub",
    icon: "fab fa-github",
    href: "https://github.com/divyamsingh007",
  },
  {
    label: "Instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/btwimdivyam/",
  },
  {
    label: "LinkedIn",
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/in/divyam-singh-duhoon-0010211bb/",
  },
  {
    label: "Email",
    icon: "fa-solid fa-envelope",
    href: "https://mail.google.com/mail/?view=cm&to=legendprice007@gmail.com",
  },
];

/* ─── Glow blob that follows the cursor ─── */
function GlowBlob({ containerRef }) {
  const blobRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
        blobRef.current.style.opacity = "1";
      }
    };
    const handleLeave = () => {
      if (blobRef.current) blobRef.current.style.opacity = "0";
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none absolute z-0 w-100 h-100 rounded-full opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle, rgba(0,180,216,0.08) 0%, rgba(96,73,110,0.04) 40%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#2B1F39] text-[#E0F0EA] rounded-t-4xl"
      id="footer-section-id"
    >
      {/* Cursor-following glow */}
      <GlowBlob containerRef={footerRef} />

      {/* ─── Giant watermark text ─── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 select-none overflow-hidden">
        <p
          className="whitespace-nowrap text-center leading-none tracking-[-0.04em]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(8rem, 22vw, 20rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(224,240,234,0.04)",
            margin: 0,
            opacity: 1,
            transform: "translateY(30%)",
          }}
        >
          DIVYAM
        </p>
      </div>

      {/* ─── Main content ─── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-24 sm:pt-28 md:pt-36 pb-8">
        {/* Top area — big headline + email CTA */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20 mb-20 md:mb-28">
            {/* Left — statement */}
            <div className="lg:max-w-[55%]">
              <h2
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 5vw + 0.5rem, 4.2rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  textAlign: "left",
                  margin: 0,
                }}
              >
                Let's create
                <br />
                <span className="italic font-light" style={{ opacity: 0.7 }}>
                  something worth
                </span>
                <br />
                talking about.
              </h2>
            </div>

            {/* Right — nav links */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <a
                href="/"
                className="line-btn"
                style={{ padding: "0.5rem 0", fontSize: "1rem" }}
              >
                <h6 className="italic" style={{ lineHeight: 1.4, margin: 0 }}>
                  Home
                </h6>
              </a>
              <a
                href="/blogs"
                className="line-btn"
                style={{ padding: "0.5rem 0", fontSize: "1rem" }}
              >
                <h6 className="italic" style={{ lineHeight: 1.4, margin: 0 }}>
                  All Blogs
                </h6>
              </a>
              <a
                href="#blogs"
                className="line-btn"
                style={{ padding: "0.5rem 0", fontSize: "1rem" }}
              >
                <h6 className="italic" style={{ lineHeight: 1.4, margin: 0 }}>
                  Latest Posts
                </h6>
              </a>
            </div>
          </div>

          {/* ─── Socials ─── */}
          <div className="mb-16 md:mb-24">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 transition-opacity duration-300 opacity-40 hover:opacity-100"
                >
                  <i className={`${s.icon} text-base text-[#E0F0EA]`} />
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "#E0F0EA",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ─── Bottom strip ─── */}
          <div className="border-t border-[#E0F0EA]/6 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left — credits */}
            <div className="flex items-center gap-3">
              <div
                style={{ background: "#00B4D8" }}
              />
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.75rem",
                  color: "#E0F0EA",
                  opacity: 0.3,
                  margin: 0,
                  textAlign: "left",
                }}
              >
                &copy; {currentYear} Divyam Singh &mdash; crafted with curiosity
              </p>
            </div>

            {/* Right — back to top */}
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 transition-opacity duration-300 opacity-30 hover:opacity-70"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.75rem",
                color: "#E0F0EA",
              }}
            >
              Back to top
              <i className="fa-solid fa-arrow-up text-[0.6rem] transition-transform duration-300 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
