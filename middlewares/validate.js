const { celebrate, Joi } = require('celebrate');
const { REG_EXP } = require('../utils/constants');

module.exports.deleteCardValidate = (req, res, next) => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  });
  next();
};

module.exports.createCardValidate = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(REG_EXP),
    }),
  });
  next();
};

module.exports.likeCardValidate = (req, res, next) => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  });
  next();
};

module.exports.createUserValidate = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(REG_EXP),
    }),
  });
  next();
};

module.exports.loginUserValidate = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  next();
};

module.exports.getUserValidate = (req, res, next) => {
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  });
  next();
};

module.exports.updateUserValidate = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  });
  next();
};

module.exports.updateAvatarValidate = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(REG_EXP),
    }),
  });
  next();
};
