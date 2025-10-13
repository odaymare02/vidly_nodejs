require("dotenv").config();
const config=require('config');
module.exports=()=>{
    if(!config.get('jwt.secret')){
        throw new Error({error:'FATAL ERROR: jwtPrivateKey is not defined'});
        process.exit(1);
    }
} 