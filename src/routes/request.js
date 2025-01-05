const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth"); //useAuth is middleware

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
  
    console.log("sending connection reqest....");
  
    res.send(user.firstName + " send the connection request send..");
  });

module.exports = requestRouter;