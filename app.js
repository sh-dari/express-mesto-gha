const express = require('express');
const mongoose = require('mongoose');
const mainRoute = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '647e6e3b5de83d6d6e00f38a',
  };
  next();
});
app.use('/', mainRoute);
app.use((req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
});
app.use(errorHandler);

app.listen(PORT);
