const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  deleteCardValidate,
  createCardValidate,
  likeCardValidate,
} = require('../middlewares/validate');

router.get('/', getCards);
router.delete('/:cardId', deleteCardValidate, deleteCard);
router.post('/', createCardValidate, createCard);
router.put('/:cardId/likes', likeCardValidate, likeCard);
router.delete('/:cardId/likes', likeCardValidate, dislikeCard);

module.exports = router;
