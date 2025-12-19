const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    profileImage: { type: String, default: "" },

    role: {
      type: String,
      enum: ['owner', 'finder'],
      default: 'owner',
    },
    password: { type: String, required: true },
  },
  { timestamps: true }  // cleaner and more powerful
);

module.exports =
  mongoose.models.User || mongoose.model('User', userSchema);
