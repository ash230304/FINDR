const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/", auth, sendMessage);
router.get("/:chatId", auth, getMessages);

module.exports = router;
