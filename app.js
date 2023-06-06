const cardRoute = require('./routes/cards');
const userRoute = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '647e6e3b5de83d6d6e00f38a'
  };
  next();
});
app.use('/users', userRoute);
app.use('/cards', cardRoute);
app.use(errorHandler);

app.listen(PORT)