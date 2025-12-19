import { useState, useContext } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload profile picture
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await API.post("/user/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Update global auth context to include new profile picture
      setAuth((prev) => ({
  ...prev,
  profileImage: res.data.url,
}));


      toast.success("Profile picture updated!");
      setLoading(false);

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10 flex justify-center">
      <motion.div
        className="bg-[#111] border border-[#222] p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={preview || auth?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-700"
          />
        </div>

        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block mb-6">
          {loading ? "Uploading..." : "Upload New Photo"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>

        <p className="text-gray-400 text-sm">
          Upload a clear photo. JPG/PNG supported.
        </p>
      </motion.div>
    </div>
  );
}
