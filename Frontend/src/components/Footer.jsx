import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#111] text-gray-400 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            FINDR <span className="text-blue-500 font-bold">.</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Lost & Found made simple.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 text-sm">
          <Link className="hover:text-white transition" to="/">Home</Link>
          <Link className="hover:text-white transition" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-white transition" to="/login">Login</Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} FINDR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
