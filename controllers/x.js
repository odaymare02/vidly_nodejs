//* POST /api/returns {customerId,movieId}==>this endpoint to return the movie


//* return 401 if client not logged in
//* return 400 if customerId is not provided
//* return 400 if movieId is not provided
//* return 404 if no rental found for this customer and movie
//* return 400 if rental already processed

//* return 200 if valid request
//* set the return date
//* calculate the rental fee
//* increase the stock
//* return the rental