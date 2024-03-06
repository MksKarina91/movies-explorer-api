const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, movieValidation } = require('../middlewares/customValidation');

// Получение списка всех фильмов текущего пользователя
movieRouter.get('/', getMovies);

// Создание нового фильма с валидацией входящих данных
movieRouter.post('/', movieValidation, createMovie);

// Удаление фильма по идентификатору с валидацией идентификатора
movieRouter.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = movieRouter;
