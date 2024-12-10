//importing
const express = require("express");
//creating instance
const app = express();

app.use("/", (req, res)=>{//request handler
    res.send("Hiiii....")
})

app.use("/hello", (req, res)=>{//request handler
    res.send("Hello....")
})

app.use("/test", (req, res)=>{//request handler
    res.send("test from the server....")
})

//server is listenig the requests
app.listen(3000, ()=>{
    console.log("server is successfully listening....")
});

