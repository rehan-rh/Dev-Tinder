const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.status(201).send({ message: "User added successfully." });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials...!");
      }
  
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        //create JWT token....
        //npm documentations
        const token = await user.getJWT();
        //console.log(token);
  
        //add the token to cookies and send the response back to the user....
        // from expressjs.com documentation
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
  
        res.send("Login successfull");
      } else {
        throw new Error("Invalid credentials...!");
      }
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });

module.exports = authRouter;