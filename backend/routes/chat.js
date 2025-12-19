const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { startChat, getChats } = require("../controllers/chatController");

router.post("/start", auth, startChat);
router.get("/", auth, getChats);

module.exports = router;