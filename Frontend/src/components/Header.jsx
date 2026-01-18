import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logoutUser } from "../utils/logout";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, user, setAuth, setUser, loading } = useContext(AuthContext);

  if (loading) return null;

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`px-3 py-1 rounded-md transition ${
        pathname === to
          ? "text-white bg-blue-600"
          : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
      }`}
    >
      {label}
    </Link>
  );

  async function handleLogout() {
    await logoutUser();
    setAuth(false);
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="bg-[#0a0a0a] border-b border-[#111] backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="font-semibold text-xl tracking-wide text-white">
          FINDR <span className="text-blue-500 font-bold">.</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <NavLink to="/" label="Home" />

          {auth && <NavLink to="/dashboard" label="Dashboard" />}
          {!auth && <NavLink to="/login" label="Login" />}

          {/* Profile Dropdown */}
          {auth && user && (
            <div className="relative group">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-gray-600 cursor-pointer object-cover"
              />

              <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-[#222] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a]"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#1a1a1a]"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
