const jwt=require('jsonwebtoken');
require('dotenv').config();
function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).json('not admin');
    next();
}

module.exports=admin;