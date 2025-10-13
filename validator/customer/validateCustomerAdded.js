const Joi = require('joi');
const validateCustomer=(customer)=>{
    const validateSchema=Joi.object({
        name:Joi.string().min(5).max(25).required(),
        phone:Joi.string().max(12).min(9).required(),
        isGold:Joi.boolean().optional()
    });
    return validateSchema.validate(customer);
}
module.exports=validateCustomer;