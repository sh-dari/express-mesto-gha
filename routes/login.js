const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const {
  createUserValidate,
  loginUserValidate,
} = require('../middlewares/validate');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginUserValidate, login);

module.exports = router;
