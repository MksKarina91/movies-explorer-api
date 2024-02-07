const userRouter = require('express').Router();
const { getUsers, updateUser } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/customValidation');

// Получение информации о текущем пользователе
userRouter.get('/me', getUsers);

// Обновление данных текущего пользователя
userRouter.patch('/me', userUpdateValidation, updateUser);

module.exports = userRouter;
