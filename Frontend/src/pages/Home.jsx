import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, MapPin, Image, Tag, X } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "http://localhost:5050";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMode, setReportMode] = useState("lost");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    images: []
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrending();
  }, []);

  async function fetchTrending(q = query, cat = category) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (cat) params.append("category", cat);
      params.append("limit", 12);

      const res = await fetch(`${API_BASE}/api/items?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : data);
    } catch (err) {
      console.error(err);
      setError("Could not load items.");
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryClick(cat) {
    setCategory(cat);
    fetchTrending(query, cat);
  }

  async function submitReport(e) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.location) {
      setError("Title & location required");
      return;
    }

    const body = new FormData();
    body.append("title", form.title);
    body.append("description", form.description);
    body.append("location", form.location);
    body.append("category", form.category);
    body.append("status", reportMode);
    form.images.forEach((img) => body.append("images", img));

    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: "POST",
        body,
      });
      if (!res.ok) throw new Error("Failed to submit");

      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setShowReportModal(false);

      setForm({ title: "", description: "", location: "", category: "", images: [] });
    } catch (err) {
      console.error(err);
      setError("Error submitting report.");
    }
  }

  const categories = [
    { key: "electronics", label: "Electronics", icon: Image },
    { key: "keys", label: "Keys", icon: Tag },
    { key: "bags", label: "Bags", icon: Tag },
    { key: "pets", label: "Pets", icon: Tag },
    { key: "documents", label: "Documents", icon: Tag },
    { key: "clothing", label: "Clothing", icon: Tag },
  ];

  // ----------------------------
  // DARK MINIMAL UI STARTS HERE
  // ----------------------------
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              FINDR  
              <span className="text-blue-500"> — Lost & Found Reimagined.</span>
            </h1>

            <p className="mt-5 text-gray-300 text-lg">
              A smarter way to report, track, and recover lost items.
            </p>

            {/* SEARCH INPUT */}
            <form
              onSubmit={(e) => { e.preventDefault(); fetchTrending(); }}
              className="mt-8 flex gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-full bg-[#111] border border-[#222] text-white pl-10 pr-4 py-3 rounded-lg shadow focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                Search
              </button>
            </form>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => { setReportMode("lost"); setShowReportModal(true); }}
                className="px-5 py-3 border border-blue-600 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition flex items-center gap-2"
              >
                <PlusCircle size={18} /> Report Lost
              </button>

              <button
                onClick={() => { setReportMode("found"); setShowReportModal(true); }}
                className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2"
              >
                <PlusCircle size={18} /> Report Found
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE PREVIEW BOX */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-72 bg-[#111] border border-[#222] rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <MapPin size={48} className="mx-auto mb-3" />
                Smart location-based item matching
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* CATEGORY CHIPS */}
      <section className="max-w-6xl mx-auto px-6 pb-4 flex gap-4 overflow-x-auto">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <motion.button
              key={c.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(c.key)}
              className="flex items-center gap-2 px-5 py-2 bg-[#111] border border-[#222] rounded-lg shadow hover:bg-[#1a1a1a] transition"
            >
              <Icon size={16} />
              {c.label}
            </motion.button>
          );
        })}
      </section>

      {/* ITEMS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Recently Added</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-44 bg-[#111] border border-[#222] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No items found.
              </div>
            ) : (
              items.map((it) => {
                const hasImages = Array.isArray(it.images) && it.images.length > 0;
                const thumb = hasImages ? it.images[0].url || it.images[0] : null;

                return (
                  <motion.div
                    key={it._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] border border-[#222] p-4 rounded-lg shadow hover:scale-[1.02] transition"
                  >
                    <div className="h-40 bg-[#1a1a1a] rounded-md overflow-hidden">
                      {thumb ? (
                        <img src={thumb} className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-600">No image</div>
                      )}
                    </div>

                    <div className="mt-3 font-semibold">{it.title}</div>
                    <div className="text-xs text-gray-500">{it.location}</div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* REPORT MODAL */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] border border-[#222] w-full max-w-xl p-6 rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {reportMode === "lost" ? "Report Lost Item" : "Report Found Item"}
                </h3>
                <button onClick={() => setShowReportModal(false)} className="p-2 text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>

              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

              <form onSubmit={submitReport} className="mt-4 space-y-3">
                <input
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded-lg"
                  placeholder="Item title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <input
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded-lg"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />

                <select
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded-lg"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <textarea
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 rounded-lg h-24"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <label className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg cursor-pointer text-gray-300">
                  <input
                    multiple
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setForm({ ...form, images: Array.from(e.target.files) })
                    }
                  />
                  <Image size={16} /> Upload Images
                </label>

                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 border border-[#333] rounded-lg text-gray-300 hover:bg-[#222]">
                    Cancel
                  </button>

                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
