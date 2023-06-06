const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const handleResponse = (res, data) => res.status(200).send(data);

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(data => handleResponse(res, data))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(data => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      handleResponse(res, data);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(data => handleResponse(res, data))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then(data => handleResponse(res, data))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then(data => handleResponse(res, data))
    .catch(next);
};