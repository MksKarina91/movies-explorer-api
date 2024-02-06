const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');

const { ERROR_CODE } = require('../utils/constants');
const {
  InaccurateDataError,
  NotFoundError,
  NoPermissionError,
} = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration, year,
    description, image,
    trailerLink, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;
  const newMovie = new Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  });

  newMovie
    .save()
    .then((createdMovie) => res.status(ERROR_CODE.CREATED).send(createdMovie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((MovieToDelete) => {
      if (!MovieToDelete) {
        throw new NotFoundError('Фильм не найден');
      }
      if (MovieToDelete.owner.toString() !== req.user._id.toString()) {
        throw new NoPermissionError('У вас нет прав на удаление чужого фильма');
      }
      return MovieToDelete.deleteOne();
    })
    .then(() => res.status(ERROR_CODE.OK).send({ message: 'Фильм был удален' }))
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }

      return next(err);
    });
};
