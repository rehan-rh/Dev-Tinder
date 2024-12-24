const express = require("express");
const connectDB = require("./cosnfig/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Sign up a new user
app.post("/signup", async (req, res) => {
  const user = new User(req.body); // Creating a new instance of the User model
  try {
    await user.save();
    res.status(201).send({ message: "User added successfully." });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong.", details: err.message });
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail }).exec();
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send(user);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong.", details: err.message });
  }
});

// Feed API: Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(204).send(); // No content
    }
    res.send(users);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong.", details: err.message });
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send({ message: "User deleted successfully." });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong.", details: err.message });
  }
});

// Update a user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photourl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed...");
    };
    if(data?.skills.length>10){
      throw new Error("skills are too many... only 10 can do");
    };
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully.");
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong.", details: err.message });
  }
});

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
