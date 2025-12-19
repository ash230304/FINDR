const Message = require("../models/Message");
const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const sender = req.user.id;

    const msg = await Message.create({
      chatId,
      sender,
      text,
    });

    // update last message
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: text,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
