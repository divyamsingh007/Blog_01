import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ContentCard({ image, title, description, link = "#" }) {
  return (
    <div className="relative group overflow-hidden shadow-2xl cursor-pointer">
      <div
        className="h-135 bg-cover bg-position-[20%_10%] transform transition duration-500 ease-out
                   group-hover:scale-105 filter group-hover:blur-sm group-hover:brightness-90"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="absolute bottom-0 w-full translate-y-17.5 group-hover:translate-y-0 transition-transform duration-300">
        <div className="relative rounded-xl bg-[#2B1F39] text-[#DFEFE9]! m-4 p-4 shadow-xl text-left!">
          <Link to={link}>
            <button className="line-btn m-0! p-0! border-0! bg-transparent! group">
              <h6 className="inline-flex items-center gap-2 italic hover:underline">
                Read More
                <ArrowRight className="w-4 h-4 transform transition-transform duration-500 origin-center group-hover:-rotate-45" />
              </h6>
            </button>
          </Link>

          <hr />

          <h6 className="mt-2! text-lg! font-medium text-right!">{title}</h6>

          <p className="mt-2! text-sm! font-extralight! text-[#DFEFE9]! line-clamp-3 text-right! opacity-100!">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
