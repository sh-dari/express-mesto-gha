const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const handleResponse = (res, data) => res.status(200).send(data);

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      handleResponse(res, data);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((data) => handleResponse(res, data))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((data) => handleResponse(res, data))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
