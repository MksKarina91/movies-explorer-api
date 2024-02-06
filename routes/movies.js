const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, movieValidation } = require('../middlewares/customValidation');

router.get('/', getMovies);
router.post('/', movieValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
