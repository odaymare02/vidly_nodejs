const express = require('express');
const router = express.Router();
const validateObjectId=require('../middleware/validateObjecId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateGenres=require('../validator/Genres/validateGenres');
const validator=require('../middleware/validator');
const genresController = require('../controllers/genres');

router.get('/', genresController.getAllGenres);

router.get('/:id',validateObjectId, genresController.getGenreById);

router.post('/', [auth,validator(validateGenres)], genresController.createGenre);

router.put('/:id', [auth,validateObjectId,validator(validateGenres)], genresController.updateGenre);

router.delete('/:id', [validateObjectId,auth, admin], genresController.deleteGenre);

module.exports = router;
