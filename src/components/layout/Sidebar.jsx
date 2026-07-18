import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  Heart, 
  StickyNote, 
  Settings,
  ChevronRight
} from "lucide-react";

function Sidebar() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/applications", label: "Applications", icon: Briefcase },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/wishlist", label: "Wishlist", icon: Heart },
    { path: "/note", label: "Note", icon: StickyNote },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center px-6 h-20 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            JobTracker
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 transition-colors ${
                ({ isActive }) => isActive ? "text-white" : "text-slate-400 group-hover:text-white"
              }`} />
              <span>{item.label}</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-all duration-200 opacity-0 -translate-x-2 ${
              ({ isActive }) => isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
            }`} />
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Section */}
      <div className="border-t border-slate-800/50 p-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">John Doe</p>
            <p className="text-slate-400 text-xs truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;