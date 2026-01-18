const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// ENV CHECK
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
  process.exit(1);
}

// DB CONNECT
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/items", require("./routes/items")); // ✅ IMPORTANT
app.use("/api/chats", require("./routes/chat"));
app.use("/api/messages", require("./routes/messageRoutes"));

// ERROR HANDLER (KEEP LAST)
const { errorHandler } = require("./middlewares/errorMiddleware");
app.use(errorHandler);

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
