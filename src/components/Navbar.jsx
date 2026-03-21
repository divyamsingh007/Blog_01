import CardNav from "../ui/CardNav";
import logo from "../assets/logo.svg";

const Navbar = (props) => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Professional Portfolio", ariaLabel: "About Portfolio" },
        { label: "Me, Personally", ariaLabel: "About Me" },
      ],
    },
    {
      label: "Writing",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Essays", ariaLabel: "Essays" },
        { label: "Short Read", ariaLabel: "Short Read" },
        { label: "Thought Pieces", ariaLabel: "Thought Pieces" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
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
