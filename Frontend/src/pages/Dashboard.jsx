import { useEffect, useState } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);  // IMPORTANT FIX
        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  // DOUBLE SAFETY: if user object fails somehow
  if (!user) {
    return (
      <div className="h-[80vh] flex justify-center items-center text-red-400">
        Failed to load user.
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-[80vh] px-6 py-10 bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-wide">
          Welcome back, <span className="text-blue-500">{user.name}</span>
        </h1>

        <p className="text-gray-400 mt-2">
          Here's a quick overview of your FINDR activity.
        </p>

        <div className="mt-6 p-5 bg-[#111] rounded-xl border border-[#1a1a1a] shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Your Account</h2>
          <p className="text-gray-300"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-gray-300"><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 bg-[#111] rounded-xl border border-[#1a1a1a] shadow">
            <h3 className="text-lg font-semibold mb-3">Your Items</h3>
            <p className="text-gray-400">Lost or found items will appear here.</p>
          </div>

          <div className="p-6 bg-[#111] rounded-xl border border-[#1a1a1a] shadow">
            <h3 className="text-lg font-semibold mb-3">Messages</h3>
            <p className="text-gray-400">Your conversation history will show here.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
