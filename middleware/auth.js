const jwt=require('jsonwebtoken');
require('dotenv').config();
function auth(req,res,next){
    const token =req.header('x-auth-token');
    if(!token) return res.status(401).json('Access denied. No token provided');
    try{
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decode;
        next();
    }catch(ex){
        res.status(400).json('invalid token');
    }
}
module.exports=auth;