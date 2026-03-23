import { Link } from "react-router-dom";
import BlogCard from "./BlogCard.jsx";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogGrid() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(p => ({
          id: p._id,
          image: p.image || "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
          title: p.title,
          description: p.description,
          category: p.category,
          link: `/blog/${p._id}`
        }));
        setCardsData(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const displayedCards = cardsData.slice(0, 5);

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-auto md:auto-rows-[280px] lg:auto-rows-[340px]">
          
          {/* Card 1: Featured Massive Hero Card */}
          {displayedCards[0] && (
            <div className="md:col-span-8 md:row-span-2">
              <BlogCard
                key={displayedCards[0].id}
                {...displayedCards[0]}
                compact={false}
                className="h-full w-full min-h-[400px] md:min-h-full"
                data-aos="fade-up"
                data-aos-delay="0"
              />
            </div>
          )}

          {/* Card 2 & 3: Stacked Sidebar */}
          <div className="md:col-span-4 md:row-span-2 flex flex-col gap-4 lg:gap-6 hidden md:flex">
            {displayedCards[1] && (
              <div className="flex-1">
                <BlogCard
                  key={displayedCards[1].id}
                  {...displayedCards[1]}
                  compact={true}
                  className="h-full w-full"
                  data-aos="fade-left"
                  data-aos-delay="100"
                />
              </div>
            )}
            {displayedCards[2] && (
              <div className="flex-1">
                <BlogCard
                  key={displayedCards[2].id}
                  {...displayedCards[2]}
                  compact={true}
                  className="h-full w-full"
                  data-aos="fade-left"
                  data-aos-delay="200"
                />
              </div>
            )}
          </div>
          
          {/* Mobile Fallback purely stacked */}
          <div className="md:hidden flex flex-col gap-4">
            {displayedCards[1] && <BlogCard key={displayedCards[1].id} {...displayedCards[1]} />}
            {displayedCards[2] && <BlogCard key={displayedCards[2].id} {...displayedCards[2]} />}
          </div>

          {/* Card 4 & 5: Bottom 50/50 Split */}
          {displayedCards[3] && (
            <div className="md:col-span-6 md:row-span-1">
              <BlogCard
                key={displayedCards[3].id}
                {...displayedCards[3]}
                compact={true}
                className="h-full w-full min-h-[300px] md:min-h-full"
                data-aos="fade-up"
                data-aos-delay="100"
              />
            </div>
          )}
          {displayedCards[4] && (
            <div className="md:col-span-6 md:row-span-1">
              <BlogCard
                key={displayedCards[4].id}
                {...displayedCards[4]}
                compact={true}
                className="h-full w-full min-h-[300px] md:min-h-full"
                data-aos="fade-up"
                data-aos-delay="200"
              />
            </div>
          )}

        </div>
      </div>

      <div className="flex justify-center mt-12 mb-8">
        <Link to="/blogs" className="relative group">
          {/* Brutalist 3D Drop Shadow */}
          <div className="absolute inset-0 bg-[#2B1F39] rounded-full translate-y-1.5 translate-x-1.5 group-hover:translate-y-2.5 group-hover:translate-x-2.5 transition-all duration-300" />
          
          {/* Button Face */}
          <div className="relative inline-flex items-center gap-4 bg-white border-2 border-[#2B1F39] text-[#2B1F39] px-10 py-5 rounded-full font-['Montserrat'] font-bold text-[0.8rem] tracking-[0.15em] uppercase group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-300 group-hover:bg-[#DFEFE9]">
            More From My Desk
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}
