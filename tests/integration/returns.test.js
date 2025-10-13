const { default: mongoose } = require('mongoose');
const {Rental}=require('../../models/rentalModel')
const User=require('../../models/user');
const request=require('supertest');
const moment=require('moment');
const Movie = require('../../models/movieModel');
describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let movie;
    let token;
    //ها الشي اسمو موش تكنيك بقوم كالتالي بالاول بعمل الفاليد بروسس وبعبي المتغيرات قيم صح وبعدين بصير يغيرهن كل تست كيس والي بجها ياه 
    const exec=async()=>{
      return await request(server)
    .post('/api/returns')
    .set('x-auth-token',token)
    .send({customerId,movieId});
    };
  beforeEach(async()=>{
    server=require('../../index');
    customerId=new mongoose.Types.ObjectId();
    movieId=new mongoose.Types.ObjectId();
    token=new User().generateToken();
    movie=new Movie({
        _id:movieId,
        title:'odaymare',
        dailyRentalRate:2,
        genre:{name:'13245'},
        numberInStock:10
    });
    await movie.save();
    rental=new Rental({
        customer:{
            _id:customerId,
            name:'odaymare',
            phone:'123456',
        },
        movie:{
            _id:movieId,
            title:'movietitle',
            dailyRentalRate:2
        }
    });
    await rental.save();
  });
  afterEach(async()=>{
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });
  it('should return 401 if client not logged in',async()=>{
    token='';
    const res=await exec()
    expect(res.status).toBe(401);
  })
  it('should return 400 if customer id not provided',async()=>{
    customerId='';
    const res=await exec()
    expect(res.status).toBe(400);
  })
  it('should return 400 if movie id not provided',async()=>{
    movieId='';
    const res=await exec();
    expect(res.status).toBe(400);
  })
  it('should return 404 no rental for the customer/movie',async()=>{
    await Rental.deleteMany({});
    const res=await exec();
    expect(res.status).toBe(404);
  })
  it('should return 400 if rental already passed',async()=>{
    rental.dateReturned=new Date();
    await rental.save();
    const res=await exec();
    expect(res.status).toBe(400);
  })
  it('should return 200 if a valid request',async()=>{
    const res=await exec();
    expect(res.status).toBe(200);
  })
  it('should set the returnDate if input is valid',async()=>{
    const res=await exec();
    const rentalInDb=await Rental.findById(rental._id);
    const diff=new Date()-rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10*1000);
  })
  it('should set the rentalFee if input is valid',async()=>{
    rental.dateOut=moment().add(-7,'days').toDate();
    await rental.save();
    //هسة ضفت ها مسبقا ليش لانو الداتا بيس بتحفظ من الوقت الحالي ما بكون في ايام لسا وانا بدي اعمل تست كانو صرلو ايام فعملت هيك 

    const res=await exec();
    const rentalInDb=await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  })
  it('should increase the number in stock',async()=>{
    const res=await exec();
    const movieInDb=await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock+1);
  })
  it('should return the rental in body',async()=>{
    const res=await exec();
    const rentalInDb=await Rental.findById(rental._id);
    // expect(res.body).toHaveProperty('dateOut');
    // expect(res.body).toHaveProperty('dateReturned');
    // expect(res.body).toHaveProperty('rentalFee');
    // expect(res.body).toHaveProperty('customer');
    // expect(res.body).toHaveProperty('movie');

    expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['dateOut','dateReturned','rentalFee','customer','movie']));
  })
})
