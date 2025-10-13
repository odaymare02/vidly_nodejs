const User = require('../../../models/user');
const jwt=require('jsonwebtoken');
const config=require('config');
const mpngoose=require('mongoose');
const { default: mongoose } = require('mongoose');
describe('user.generateAuthToken', () => {
  it('should return a valid JWT',()=>{
    const payload={
        _id:new mongoose.Types.ObjectId().toHexString(),
        isAdmin:true
    };
    const user=new User(payload);
    const token=user.generateToken();
    const decode=jwt.verify(token,config.get('jwt.secret'));
    expect(decode).toMatchObject(payload);
  })
})
