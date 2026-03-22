import CardNav from "../ui/CardNav";
import logo from "../assets/logo.svg";

const Navbar = (props) => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Professional Portfolio", ariaLabel: "About Portfolio", href: "https://divyamsingh.me/" },
        { label: "Me, Personally", ariaLabel: "About Me", href: "/about" },
      ],
    },
    {
      label: "Writing",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Essays", ariaLabel: "Essays", href: "/blogs?category=Essays" },
        { label: "Short Read", ariaLabel: "Short Read", href: "/blogs?category=Short+Read" },
        { label: "Thought Pieces", ariaLabel: "Thought Pieces", href: "/blogs?category=Thought+Pieces" },
        { label: "Dev Log", ariaLabel: "Dev Log", href: "/blogs?category=Dev+Log" },
        { label: "Travel", ariaLabel: "Travel", href: "/blogs?category=Travel" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:legendprice007@gmail.com" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://x.com/DivSingh2006?t=OA4u2w-u7Xkt17R9KpYTkQ&s=09" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/divyam-singh-duhoon-0010211bb/" },
      ],
    },
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#2B1F39"
      menuColor="#E0F0EA"
      buttonBgColor="#E0F0EA"
      buttonTextColor="#2B1F39"
      ease="power3.out"
      {...props}
    />
  );
};

export default Navbar;
