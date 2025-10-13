const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const movieValidator=require('../validator/Movie/movieValidator');
const validator=require('../middleware/validator');
// GET all movies
router.get('/', moviesController.getAllMovies);

// POST new movie
router.post('/', validator(movieValidator),moviesController.createMovie);

module.exports = router;
