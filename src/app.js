const express = require("express");
const connectDB = require("./cosnfig/database");
const app = express();
const User = require("./models/user");
app.use(express.json()); //this is middleware converts the json format to js object

app.post("/signup", async (req, res) => {
  //creating new insance of the user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully...");
  } catch (err) {
    res.status(400).send("Something went wrong...", arr.message);
  }
});

// first connect the database then start listening the server
connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(3000, () => {
      console.log("server is successfully listening....");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...!!");
  });
