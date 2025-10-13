require('dotenv').config();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config');
const userSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,//cuz it convert to hash
    },
    isAdmin:Boolean
});

userSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwt.secret'),{expiresIn:'1h'});
    return token;
}
const User=mongoose.model('User',userSchema);
module.exports=User;