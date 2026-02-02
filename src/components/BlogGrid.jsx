import { Link } from "react-router-dom";
import BlogCard from "./BlogCard.jsx";
import { ArrowRight } from "lucide-react";

export default function BlogGrid() {
  const cardsData = [
    ...Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: `Boxing icon has the will for a couple more fights ${i + 1}`,
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: `/article/${i + 1}`,
    })),
  ];

  const displayedCards = cardsData.slice(0, 3);

  return (
    <div className="py-16">
      <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-3 lg:px-4">
        {displayedCards.map((card) => (
          <BlogCard
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
            category={card.category}
            data-aos="fade-up"
          />
        ))}
      </div>

      <div className="relative -mt-8 flex justify-center">
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-24 
                     bg-linear-to-b from-transparent via-[#2B1F39]/50 to-[#2B1F39]
                     pointer-events-none"
        />
        <Link
          to="/blogs"
          className="group relative inline-flex items-center gap-4 bg-[#DFEFE9] text-[#2B1F39] 
                     px-10 py-5 rounded-full font-semibold text-lg
                     hover:bg-white hover:scale-105
                     transition-all duration-300 
                     shadow-[0_0_30px_rgba(223,239,233,0.4)]
                     hover:shadow-[0_0_50px_rgba(223,239,233,0.6)]
                     z-10"
        >
          More From My Desk
          <ArrowRight
            size={22}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </div>
  );
}
