const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./utils/NotFoundError');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors());
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://api.anna.mesto.students.nomoredomains.sbs',
  'http://api.anna.mesto.students.nomoredomains.sbs',
  'http://anna.mesto.students.nomoredomains.sbs',
  'https://anna.mesto.students.nomoredomains.sbs',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

// Если это предварительный запрос, добавляем нужные заголовки

// сохраняем список заголовков исходного запроса
const requestHeaders = req.headers['access-control-request-headers'];
if (method === 'OPTIONS') {

    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
}

  next();
});

// роуты, нетребующие авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%-_+~#?&/=]*)/),
  }),
}), createUser);
// авторизация
app.use(auth);

// роуты, требующие авторизации
app.use('/cards', auth, cardRoutes);
app.use('/users', auth, userRoutes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use('/', auth, (req, res, next) => {
  next(new NotFoundError('Нет такой страницы'));
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  console.log('Connected to db');

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
