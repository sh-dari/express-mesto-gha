const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const handleResponse = (res, data) => res.status(200).send(data);

const updateUser = (req, res, next, userData) => {
  User.findByIdAndUpdate(
    req.user._id,
    userData,
    { new: true, runValidators: true },
  )
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
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

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
};
