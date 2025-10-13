const mongoose=require('mongoose');
const {genresSchema}=require('./genresModel');
const { number } = require('joi');
const Movie=mongoose.model('Movie',new mongoose.Schema({
    //here the representaion in DB
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:genresSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
}));

module.exports=Movie;