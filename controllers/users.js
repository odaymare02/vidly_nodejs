const User = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const validate  = require('../validator/user/userValidator');


exports.getAllUsers = async (req, res) => {
  const users = await User.find().sort('name');
  if(!user){
    const error=new Error('no users founded');
    error.statusCode=400;
    throw error; 
  }
  res.json(users);
};


exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user){
    const error=new Error('user not found');
    error.statusCode=400;
    throw error; 
  } 
  return res.status(200).send(user);
};

exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json('this email already taken');

  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const useResponse = _.pick(user, ['_id', 'name', 'email']);
  const token = user.generateToken();
  res.header('x-auth-token', token).status(201).json(useResponse);
};
