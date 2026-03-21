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
            <div className="flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tab group"
                >
                  <span className="social-tab__icon">
                    <i className={s.icon} />
                  </span>
                  <span className="social-tab__label">{s.label}</span>
                </a>
              ))}
            </div>

            {/* Scoped styles for the social tabs */}
            <style>{`
              .social-tab {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 0;
                padding: 0;
                border-radius: 100px;
                background: rgba(224, 240, 234, 0.06);
                border: 1px solid rgba(224, 240, 234, 0.08);
                text-decoration: none;
                overflow: hidden;
                transition: background 0.4s cubic-bezier(.4,0,.2,1),
                            border-color 0.4s cubic-bezier(.4,0,.2,1),
                            box-shadow 0.4s cubic-bezier(.4,0,.2,1),
                            transform 0.35s cubic-bezier(.4,0,.2,1);
                cursor: pointer;
              }

              .social-tab:hover {
                background: rgba(224, 240, 234, 0.12);
                border-color: rgba(224, 240, 234, 0.22);
                box-shadow: 0 0 20px rgba(224, 240, 234, 0.08),
                            0 4px 16px rgba(0, 0, 0, 0.15);
                transform: translateY(-2px);
              }

              .social-tab__icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background: rgba(224, 240, 234, 0.1);
                color: #E0F0EA;
                font-size: 0.9rem;
                flex-shrink: 0;
                transition: background 0.4s cubic-bezier(.4,0,.2,1),
                            color 0.4s cubic-bezier(.4,0,.2,1),
                            transform 0.35s cubic-bezier(.4,0,.2,1);
              }

              .social-tab:hover .social-tab__icon {
                background: #E0F0EA;
                color: #2B1F39;
                transform: scale(1.05);
              }

              .social-tab__label {
                display: inline-block;
                max-width: 0;
                overflow: hidden;
                white-space: nowrap;
                opacity: 0;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.04em;
                color: #E0F0EA;
                padding-right: 0;
                transition: max-width 0.45s cubic-bezier(.4,0,.2,1),
                            opacity 0.35s cubic-bezier(.4,0,.2,1) 0.05s,
                            padding 0.45s cubic-bezier(.4,0,.2,1);
              }

              .social-tab:hover .social-tab__label {
                max-width: 120px;
                opacity: 1;
                padding-right: 16px;
                padding-left: 8px;
              }

              @media (max-width: 480px) {
                .social-tab__icon {
                  width: 36px;
                  height: 36px;
                  font-size: 0.85rem;
                }
              }
            `}</style>
          </div>

          {/* ─── Bottom strip ─── */}
          <div className="border-t border-[#E0F0EA]/6 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left — credits */}
            <div className="flex items-center gap-3">
              <div style={{ background: "#00B4D8" }} />
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
            <a href="#top" className="btt">
              <span className="btt__line" />
              <span className="btt__label">Top</span>
              <i className="fa-solid fa-arrow-up btt__icon" />
            </a>

            <style>{`
              .btt {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                text-decoration: none;
                cursor: pointer;
                color: rgba(224, 240, 234, 0.35);
                transition: color 0.3s ease;
              }
              .btt:hover {
                color: #E0F0EA;
              }

              .btt__line {
                display: block;
                width: 24px;
                height: 1px;
                background: currentColor;
                transition: width 0.4s cubic-bezier(.4,0,.2,1),
                            background 0.3s ease;
              }
              .btt:hover .btt__line {
                width: 40px;
              }

              .btt__label {
                font-family: 'Montserrat', sans-serif;
                font-size: 0.7rem;
                font-weight: 600;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }

              .btt__icon {
                font-size: 0.55rem;
                transition: transform 0.35s cubic-bezier(.4,0,.2,1);
              }
              .btt:hover .btt__icon {
                transform: translateY(-3px);
              }
            `}</style>
          </div>
        </div>
      </div>
    </footer>
  );
}
