const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/customValidation');

router.get('/me', getCurrentUser);
router.patch('/me', userUpdateValidation, updateUser);

module.exports = router;
