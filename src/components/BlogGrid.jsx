import BlogCard from "./BlogCard";

export default function BlogGrid() {
  const cardsData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: "Boxing icon has the will for a couple more fights",
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: "/article/boxing-icon",
    },
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: "Boxing icon has the will for a couple more fights",
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: "/article/boxing-icon",
    },
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: "Boxing icon has the will for a couple more fights",
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: "/article/boxing-icon",
    },
  ];

  return (
    <div className="py-16 w-screen">
      <div className="max-w-screen grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {cardsData.map((card) => (
          <BlogCard
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}
