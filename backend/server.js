const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/chats", require("./routes/chat"));      // ⭐ NEW
app.use("/api/messages", require("./routes/messageRoutes")); // ⭐ NEW

// ERROR HANDLER
const { errorHandler } = require("./middlewares/errorMiddleware.js");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
