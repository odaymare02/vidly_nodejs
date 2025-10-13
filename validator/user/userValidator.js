const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity');
function validate(user){
    const complexityOptions = {
       min: 8, // أقل طول
       max: 30, // أقصى طول
       lowerCase: 1, // عدد الحروف الصغيرة المطلوبة
       upperCase: 1, // عدد الحروف الكبيرة المطلوبة
       numeric: 1, // عدد الأرقام المطلوبة
       symbol: 1, // عدد الرموز المطلوبة
       requirementCount: 4, // عدد الشروط التي يجب توافرها
    }; 
    const  schema=Joi.object({
        name:Joi.string().min(5).max(20).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:passwordComplexity(complexityOptions).required()
    });
    return schema.validate(user);
}
module.exports=validate;