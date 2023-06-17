const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const undefinedRoute = (req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
};
const cardRoute = require('./cards');
const userRoute = require('./users');
const { createUser, login } = require('../controllers/users');
const {
  createUserValidate,
  loginUserValidate,
} = require('../middlewares/validate');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginUserValidate, login);

router.use(auth);
router.use('/users', userRoute);
router.use('/cards', cardRoute);

router.use(undefinedRoute);

module.exports = router;
