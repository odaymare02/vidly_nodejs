const Movie = require('../models/movieModel');
const { validateMovie } = require('../validator/Movie/movieValidator');
const { Genres } = require('../models/genresModel');

// GET all movies
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.json(movies);
};

// POST create a new movie
exports.createMovie = async (req, res) => {
  // const { error } = validateMovie(req.body);
  // if (error) return res.status(400).json(error.details[0].message);

  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).json('Invalid genre');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();
  res.status(201).json(movie);
};
