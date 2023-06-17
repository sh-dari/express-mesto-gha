const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const cardRoute = require('./cards');
const userRoute = require('./users');
const loginRoute = require('./login');

const undefinedRoute = (req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
};

router.use('/', loginRoute);

router.use(auth);
router.use('/users', userRoute);
router.use('/cards', cardRoute);

router.use(undefinedRoute);

module.exports = router;
