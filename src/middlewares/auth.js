const adminAuth = (req, res, next)=>{
    const token = "xyz";
    const valid = token ==="xyz";
    if(!valid)
    {
        res.status(401).send("Unauthorised requist");
    }
    else{
        next();
    }
}

const userAuth = (req, res, next)=>{
    const token = "user";
    const valid = token ==="user";
    if(!valid)
    {
        res.status(401).send("Unauthorised requist");
    }
    else{
        next();
    }
}



module.exports = {adminAuth,userAuth};