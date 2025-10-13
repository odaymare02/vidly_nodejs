const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/me', auth, usersController.getMe);

router.post('/', usersController.registerUser);

module.exports = router;
