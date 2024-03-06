const userRouter = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/customValidation');

// Получение информации о текущем пользователе
userRouter.get('/me', getUserById);

// Обновление данных текущего пользователя
userRouter.patch('/me', userUpdateValidation, updateUser);

module.exports = userRouter;
