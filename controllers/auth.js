const validate=require('../validator/auth/validate');
const User=require('../models/user');
const bcrypt=require('bcrypt');
exports.login=async(req,res)=>{
    // const{error}=validate(req.body);
    // if(error)
    //     return res.status(400).json(error.details[0].message);//replace with validator MW
    const user=await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).json('invalid email or password');
    const isValid=await bcrypt.compare(req.body.password,user.password);
    if(!isValid)
        return res.status(400).json('invalid email or password');//or can save the secrete in config and gain using config.get('') OR process.env.SECRET_KEY
    // const token=jwt.sign({_id:user._id},config.get('jwt.secret') ,{expiresIn:'1h'});
    const token=user.generateToken();
    res.send(token);
};