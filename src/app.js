const express = require("express");
const connectDB = require("./cosnfig/database");
const app = express();
const User = require("./models/user")

app.post("/signup", async(req, res)=>{
    const userObj = {
        firstName: "saniya",
        lastName: "begum",
        emailId: "rehan@gmail.com",
        password: "rehan123"

    }
    //creating new insance of the user model
    const user = new User(userObj);
    try{
        await user.save();
    res.send("User added successfully...");
    }
    catch(err){
        res.status(400).send("Something went wrong...", arr.message);
    }
    

    
})



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


