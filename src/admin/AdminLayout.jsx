import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { LayoutDashboard, FileText, Settings, Copy } from "lucide-react";

export default function AdminLayout() {
  const mobileNav = [
    { label: "Dash", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Posts", icon: FileText, path: "/admin/posts" },
    { label: "Write", icon: Copy, path: "/admin/editor" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#DFEFE9] text-[#2B1F39] flex flex-col md:flex-row selection:bg-[#2B1F39] selection:text-[#DFEFE9]">
      <Sidebar />
      <main className="flex-1 max-h-screen overflow-y-auto w-full relative pb-24 md:pb-0">
        <div className="p-6 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-[#2B1F39]/10 px-6 py-4 flex items-center justify-between z-50">
        {mobileNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-[#2B1F39]" : "text-[#2B1F39]/40 hover:text-[#2B1F39]"
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-['Montserrat']! font-bold! uppercase! text-[0.55rem]! tracking-widest!">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
