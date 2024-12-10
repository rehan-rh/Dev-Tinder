//importing
const express = require("express");
//creating instance
const app = express();
//order of routes matter a lot...

const { adminAuth, userAuth } = require("./middlewares/auth.js")


app.get("/getUserData",  (req, res)=>{
    try{
    res.send("All user data sent");
    }
    catch(err){
        res.status(401).send("something went wrong....");
    }
    
});

//error handling - proper way is try and catch but keep this code at the end
// app.use("/", (err, req, res, next)=>{
//     if(err)
//     {
//         res.status(500).send("something went wrong....");
//     }

// });


//server is listenig the requests
app.listen(3000, ()=>{
    console.log("server is successfully listening....")
});

