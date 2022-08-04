const { response } = require("express");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization;
        console.log("token", token)
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        console.log("decodedToken", decodedToken)
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        }
        next();
    }
    catch(e){
        console.log(e);
        res.status(401).json({
            status: {
                message: "Auth Failed!",
                code: 401
            }
        });
    }
    
}