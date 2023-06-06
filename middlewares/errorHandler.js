const NOT_FOUND_ERROR_CODE = 404;
const INVALID_DATA_ERROR_CODE = 400;

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'NotFoundError') {
    res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь/карточка не найден/a' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(INVALID_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка на сервере'
      : message,
  });
  next();
};
