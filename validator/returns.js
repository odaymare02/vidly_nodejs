const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const validateReturn=(req)=>{
    const schema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    });
    return schema.validate(req);
};
module.exports=validateReturn;
