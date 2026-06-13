import { FaMicrophone, FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LEFT — logo + name */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FaMicrophone className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">
              ConsultManager
            </h1>
            <p className="text-gray-400 text-xs">
              Recording Management System
            </p>
          </div>
        </div>

        {/* RIGHT — status badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">
              Live
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;