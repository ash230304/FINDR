const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// -----------------------
// REGISTER USER
// -----------------------
exports.registerUser = async (req, res) => {
  const { name, phone, role, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      phone,
      role,
      password: hashedPassword,
    });

    await user.save();

    // create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage || "",
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// -----------------------
// LOGIN USER
// -----------------------
exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage || "",
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// -----------------------
// GET LOGGED-IN USER
// -----------------------
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user }); // Must wrap in { user: ... }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// -----------------------
// DELETE USER
// -----------------------
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
      return res.status(401).json({ error: "You cannot delete this account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    next(err);
  }
};

// -----------------------
// LOGOUT USER
// -----------------------
exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ msg: "Logged out successfully" });
};
