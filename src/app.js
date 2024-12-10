//importing
const express = require("express");
//creating instance
const app = express();
//order of routes matter a lot...

const { adminAuth, userAuth } = require("./middlewares/auth.js")

app.use("/admin", adminAuth);

app.get("/user", userAuth,  (req, res)=>{
    res.send("All user data sent");
});

app.get("/admin/getAllData", (req, res)=>{
    res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res)=>{
    res.send("Deleted a user");
});


app.use("/", (req, res)=>{//this function is route handler
   // res.send("test from the server....")
})

//server is listenig the requests
app.listen(3000, ()=>{
    console.log("server is successfully listening....")
});

