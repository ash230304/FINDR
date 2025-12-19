const Item = require("../models/Item");

// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, description, location, category, status, postedBy } = req.body;

    if (!title || !location) {
      return res.status(400).json({ error: "Title and location are required" });
    }

    // Convert uploaded files (buffer) to base64 URLs
    const images = (req.files || []).map(file => ({
      url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    }));

    const item = new Item({
      title,
      description,
      location,
      category,
      status: status || "lost",
      postedBy: postedBy || null,
      images
    });

    await item.save();
    res.status(201).json(item);

  } catch (err) {
    console.error("Create Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ITEMS
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("Get Items Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// CLAIM ITEM
exports.claimItem = async (req, res) => {
  try {
    const { itemId, userId } = req.body;
    const item = await Item.findById(itemId);

    if (!item) return res.status(404).json({ error: "Item not found" });

    item.status = "claimed";
    item.claimedBy = userId;

    await item.save();

    res.json(item);

  } catch (err) {
    console.error("Claim Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
