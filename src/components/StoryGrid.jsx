import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import CircularGallery from "../ui/CircularGallery";

export default function StoryGrid() {
  const navigate = useNavigate();

  const travelStories = [
    {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      text: "Swiss Alps",
      link: "/story/swiss-alps",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      text: "Dubai",
      link: "/story/dubai",
    },
    {
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      text: "Kyoto",
      link: "/story/kyoto",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      text: "Santorini",
      link: "/story/santorini",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
      text: "Rome",
      link: "/story/rome",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      text: "Maldives",
      link: "/story/maldives",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      text: "Taj Mahal",
      link: "/story/taj-mahal",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      text: "Paris",
      link: "/story/paris",
    },
  ];

  const handleItemClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="pb-16">
      <div className="h-[500px] md:h-[600px] w-screen relative left-1/2 -translate-x-1/2">
        <CircularGallery
          items={travelStories}
          bend={1}
          textColor="#fffff"
          borderRadius={0.05}
          font="bold 24px Figtree"
          scrollSpeed={2}
          scrollEase={0.05}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Button */}
      <div className="relative mt-8 flex justify-center">
        <Link
          to="/stories"
          className="group relative inline-flex items-center gap-4 bg-[#3D2A52] text-[#DFEFE9] 
                     px-10 py-5 rounded-full font-semibold text-lg
                     border border-[#DFEFE9]/20
                     hover:bg-[#4A3363] hover:border-[#DFEFE9]/40 hover:scale-105
                     transition-all duration-300 
                     shadow-[0_0_30px_rgba(61,42,82,0.5)]
                     hover:shadow-[0_0_50px_rgba(223,239,233,0.3)]
                     z-10"
        >
          Explore All Stories
          <ArrowRight
            size={22}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </div>
  );
}
