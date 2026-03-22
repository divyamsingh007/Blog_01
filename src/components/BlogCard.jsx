import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogCard({
  image,
  title,
  description,
  link = "#",
  category,
  readTime,
  compact = false,
  ...props
}) {
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      {...props}
      ref={cardRef}
      className={`relative group overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end p-6 md:p-8 border border-[#2B1F39]/5 ${
        props.className || "min-h-[350px]"
      }`}
    >
      {/* image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* gradient overlay — deepens on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-[#2B1F39] via-[#2B1F39]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      {/* top-left category badge */}
      {category && (
        <div
          className="absolute top-5 left-5 z-10 transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(-12px)",
            transitionDelay: "200ms",
          }}
        >
          <span
            className="px-3.5 py-1.5 rounded-full bg-[#E0F0EA] text-[#2B1F39] backdrop-blur-md shadow-md shadow-[#2B1F39]/15"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
        </div>
      )}

      {/* top-right read time */}
      {readTime && (
        <div
          className="absolute top-5 right-5 z-10 transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(-12px)",
            transitionDelay: "300ms",
          }}
        >
          <span
            className="flex items-center gap-1.5 text-[#E0F0EA]/70"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}
          >
            <Clock size={11} />
            {readTime}
          </span>
        </div>
      )}

      {/* content — slides up on first reveal, stays visible */}
      <div
        className="relative z-10 transition-all duration-700 ease-out flex flex-col justify-end"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(40px)",
          opacity: revealed ? 1 : 0,
          transitionDelay: "100ms",
        }}
      >
        {/* title */}
        <h6
          className="text-[#E0F0EA] drop-shadow-sm"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 800,
            lineHeight: "1.3",
            letterSpacing: "-0.02em",
            textAlign: "left",
            textWrap: "balance",
          }}
        >
          {title}
        </h6>

        {/* description */}
        <p
          className="mt-3 text-[#E0F0EA]! opacity-100! line-clamp-2 transition-all duration-700 ease-out"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "0.88rem",
            fontWeight: 400,
            lineHeight: "1.75",
            textAlign: "left",
            letterSpacing: "0.005em",
            color: "#E0F0EA",
            opacity: revealed ? 0.65 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "350ms",
          }}
        >
          {description}
        </p>

        {/* CTA row */}
        <div
          className="mt-4 flex items-center justify-between transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "500ms",
          }}
        >
          <Link to={link} className="group/btn inline-flex items-center gap-2">
            <span
              className="text-[#E0F0EA]/70 group-hover/btn:text-[#E0F0EA] transition-colors"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Read More
            </span>
            <ArrowRight
              size={13}
              className="text-[#E0F0EA]/70 group-hover/btn:text-[#E0F0EA] transition-all duration-500 group-hover/btn:translate-x-1"
            />
          </Link>

          {/* decorative accent line */}
          <div
            className="h-px flex-1 mx-4"
            style={{
              background: "linear-gradient(90deg, #E0F0EA20, transparent)",
              opacity: revealed ? 1 : 0,
              transition: "opacity 700ms ease-out 600ms",
            }}
          />
        </div>
      </div>

      {/* hover border glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-[#E0F0EA]/0 group-hover:border-[#E0F0EA]/10 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
