const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentals');
const validateRental=require('../validator/Rental/rentalValidator');
const validator=require('../middleware/validator');

// GET all rentals
router.get('/', rentalsController.getAllRentals);

// GET rental by id
router.get('/:id', rentalsController.getRentalById);

// POST create rental
router.post('/', validator(validateRental),rentalsController.createRental);

module.exports = router;
