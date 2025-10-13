const Joi = require('joi');
const validateGenres=(genres)=>{
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50),
    });
    return schema.validate(genres);
};
module.exports=validateGenres;
