const mongoose=require('mongoose');

const genresSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

// module.exports=mongoose.model('Genres',genresSchema);
const Genres=mongoose.model('Genre',genresSchema);
module.exports.Genres=Genres;
module.exports.genresSchema=genresSchema;