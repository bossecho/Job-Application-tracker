import { Link } from "react-router-dom";
import { Plus, Bell, User } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 h-20 flex items-center justify-between px-6 sticky top-0 z-50">
      
      <div>
        <h1 className="text-white text-xl font-bold tracking-tight">
          JobTracker
        </h1>
        <p className="text-slate-400 text-xs font-medium">
          Track your applications efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors relative">
          <Bell className="w-5 h-5 text-slate-400 hover:text-white" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-600/20">
          JD
        </div>
      </div>

    </header>
  );
}

export default Navbar;