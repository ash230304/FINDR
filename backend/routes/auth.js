
const { deleteUser } = require("../controllers/authController");
const { logoutUser } = require("../controllers/authController");


const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser  } = require('../controllers/authController');
const protect = require("../middlewares/auth");
const authMiddleware  = require("../middlewares/auth");
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete("/delete/:id", protect, deleteUser);
router.get("/me", authMiddleware, getUser);
router.post("/logout", logoutUser);


module.exports = router;



