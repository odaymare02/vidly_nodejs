const Movie = require('../models/movieModel');
const {Rental}=require('../models/rentalModel');
const moment=require('moment');
exports.addReturns = async (req, res) => {
    
    if(!req.body.customerId) return res.
                                    status(400)
                                    .send('customerId not provided');
    if(!req.body.movieId) return res.
                                    status(400)
                                    .send('movieId not provided');
    const rental=await Rental.lookup(req.body.customerId,req.body.movieId);
     
    if(!rental) return res
    .status(404)
    .send('no rental found for this customer/movie id')
    if(rental.dateReturned) return res.status(400).send('return already processed');
    //! best bractice to encapsuate this to rental model
    // rental.dateReturned=new Date();
    // const rentalDays=moment().diff(rental.dateOut,'days')
    // rental.rentalFee=rentalDays*rental.movie.dailyRentalRate;
    rental.return();
    await rental.save();
    await Movie.updateOne({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    });
    return res.send(rental); 
}