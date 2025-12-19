const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  
  // MULTIPLE IMAGES
  images: [
    {
      url: String,
    }
  ],

  location: { type: String, required: true },

  category: { type: String }, // electronics, keys, etc.

  status: { 
    type: String, 
    enum: ['lost', 'found', 'claimed'], 
    default: 'lost' 
  },

  // Who posted it
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

  // Who claimed it (optional)
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema);
