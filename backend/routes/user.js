const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const User = require("../models/User");
const auth = require("../middlewares/auth");


router.post("/upload-profile", auth, upload.single("image"), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      profileImage: req.file.path
    });

    res.json({
      msg: "Profile picture updated",
      url: req.file.path
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

module.exports = router;
