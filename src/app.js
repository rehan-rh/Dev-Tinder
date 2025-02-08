const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend origin
  credentials: true,  // Allow cookies and authentication headers
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],  // Explicitly allow PATCH
  allowedHeaders: ["Content-Type", "Authorization"],  // Ensure content-type is allowed
}));
app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


// Connect to database and start the server
connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...!!", err.message);
  });
