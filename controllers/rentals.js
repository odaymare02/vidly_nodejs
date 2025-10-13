const { Rental } = require('../models/rentalModel');
const { validateRental } = require('../validator/Rental/rentalValidator');
const Movie = require('../models/movieModel');
const Customer = require('../models/customerModel');
const mongoose = require('mongoose');

// GET all rentals
exports.getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);
};

// GET rental by id
exports.getRentalById = async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
};

// POST create rental (transaction with stock update)
exports.createRental = async (req, res) => {
  // const { error } = validateRental(req.body);
  // if (error) return res.status(400).json('error: ' + error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).json('customer not found');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).json('movie not found');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });

    rental = await rental.save({ session });

    const updateMovie = await Movie.findByIdAndUpdate(
      movie._id,
      { $inc: { numberInStock: -1 } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.send({ rental, updateMovie });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send('Transaction failed: ' + err.message);
  }
};
