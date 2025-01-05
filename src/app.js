const express = require("express");
const connectDB = require("./cosnfig/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



// Connect to database and start the server
connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...!!", err.message);
  });
