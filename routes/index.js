const router = require('express').Router();
const cardRoute = require('./cards');
const userRoute = require('./users');

router.use('/users', userRoute);
router.use('/cards', cardRoute);

module.exports = router;
