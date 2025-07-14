const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next)=>{
    try{
    // read the token from the req cookies

    const {token} = req.cookies;
    console.log(token);
    if(!token){
        return res.status(401).send("Please login");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const {_id} = decodedObj;

    const user = await User.findById(_id);


    if(!user){
        throw new Error("User not found")
    }

    req.user = user;

    next();

    //validate the token 
    //find the user
    }catch (err) {
        res.status(400).send("Error : " + err.message);
      }
}


module.exports = {userAuth};