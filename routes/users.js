const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');
const {
  getUserValidate,
  updateUserValidate,
  updateAvatarValidate,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserValidate, getUser);
router.patch('/me', updateUserValidate, updateProfile);
router.patch('/me/avatar', updateAvatarValidate, updateAvatar);

module.exports = router;
