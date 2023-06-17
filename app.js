require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mainRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use('/', loginRoute);

app.use(auth);

app.use('/', mainRoute);

app.use((req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
