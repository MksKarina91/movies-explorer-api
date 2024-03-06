const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

// Импорт класса ошибки должен соответствовать пути и способу экспорта
const NotFoundError = require('../errors/NotFoundError');

// Использование роутов для пользователей и фильмов
router.use('/users', userRouter);
router.use('/movies', movieRouter);

// Обработка несуществующих путей
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
