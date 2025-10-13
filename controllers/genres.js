const { default: mongoose } = require('mongoose');
const { Genres } = require('../models/genresModel');
const validateGenres = require('../validator/Genres/validateGenres');
// GET all genres
exports.getAllGenres = async (req, res) => {
    // اختبار لإظهار الخطأ (يمكن تحذفه لاحقًا)
    // throw new Error('test tes'); 
    const genres = await Genres.find().sort('name');
    res.send(genres);
};

// GET genre by ID
exports.getGenreById = async (req, res) => {
    const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(404).send('the genere wuth the given ID was not found');
    res.send(genre);
};

// POST new genre
exports.createGenre = async (req, res) => {
    // const { error } = validateGenres(req.body);
    // if (error) return res.status(400).send(`errors: ${error.details.map(e => e.message)}`);

    const genre = new Genres({ name: req.body.name });
    await genre.save();
    res.send(genre);
};

// PUT update genre
exports.updateGenre = async (req, res) => {
    // const { error } = validateGenres(req.body);
    // if (error) return res.status(400).send(`errors: ${error.details.map(e => e.message)}`);

    const genre = await Genres.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    if (!genre) return res.status(404).send('not found');
    res.send(genre);
};

// DELETE genre
exports.deleteGenre = async (req, res) => {
    const genre = await Genres.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('not found');
    res.send(genre);
};
