const Chat = require("../models/Chat");

exports.startChat = async (req, res) => {
  try {
    const otherUserId = req.body.userId;
    const userId = req.user.id;

    // Check if chat exists
    let chat = await Chat.findOne({
      users: { $all: [userId, otherUserId] },
    });

    if (!chat) {
      chat = await Chat.create({
        users: [userId, otherUserId]
      });
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ users: userId })
      .populate("users", "name email")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
