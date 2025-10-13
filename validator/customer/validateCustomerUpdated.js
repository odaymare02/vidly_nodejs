const Joi = require('joi');
const validateCustomerUpdated=(customer)=>{
    const validateSchema=Joi.object({
        name:Joi.string().min(5).max(25).optional(),
        phone:Joi.string().max(12).min(9).optional(),
        isGold:Joi.boolean().optional()
    });
    return validateSchema.validate(customer);
}
module.exports=validateCustomerUpdated;