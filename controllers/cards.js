const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const handleResponse = (res, data) => res.status(200).send(data);

const updateCard = (req, res, next, action) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    action,
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

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      const owner = data.owner.toString();
      if (req.user._id === owner) {
        Card.deleteOne(data)
          .then(() => {
            res.send(data);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Невозможно удалить чужую карточку');
      }
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
    .then((data) => res.status(201).send(data))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  updateCard(req, res, next, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res, next) => {
  updateCard(req, res, next, { $pull: { likes: req.user._id } });
};
