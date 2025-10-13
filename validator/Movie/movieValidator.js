const joi=require('joi');
joi.objectId=require('joi-objectid')(joi);
exports.validateMovie=(movie)=>{
    const schema=joi.object({//this input from user
        title:joi.string().min(5).max(50).required(),
        genreId:joi.objectId().required(),
        numberInStock:joi.number().min(0).max(50),
        dailyRentalRate:joi.number().min(0).required()
    });
    return schema.validate(movie);
}