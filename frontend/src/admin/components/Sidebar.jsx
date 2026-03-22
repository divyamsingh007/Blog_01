import { NavLink, useNavigate, Link } from "react-router-dom";
import { Copy, LayoutDashboard, FileText, Settings, LogOut, Home } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "All Posts", icon: FileText, path: "/admin/posts" },
    { label: "New Post", icon: Copy, path: "/admin/editor" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white/50 backdrop-blur-xl border-r border-[#2B1F39]/10 sticky top-0 flex flex-col p-6 overflow-hidden hidden md:flex">
      {/* Brand */}
      <div className="mb-12">
        <h2 className="font-['Bricolage_Grotesque']! text-3xl! font-black! text-[#2B1F39]! tracking-[-0.04em]!">
          Archive.
        </h2>
        <p className="font-['Montserrat']! text-[0.65rem]! text-[#2B1F39]/50! mt-1 font-bold! uppercase! tracking-widest!">
          Admin Portal
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl font-['Montserrat']! text-[0.7rem]! font-bold! uppercase! tracking-widest! transition-all duration-300 ${
                isActive
                  ? "bg-[#2B1F39] text-[#DFEFE9] shadow-md shadow-[#2B1F39]/20"
                  : "text-[#2B1F39]/60 hover:bg-white hover:text-[#2B1F39]"
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-['Montserrat']! text-[0.7rem]! font-bold! uppercase! tracking-widest! text-[#2B1F39]/60 hover:bg-white hover:text-[#2B1F39] transition-all duration-300"
        >
          <Home size={16} />
          View Site
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-['Montserrat']! text-[0.7rem]! font-bold! uppercase! tracking-widest! text-red-500/70 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}
