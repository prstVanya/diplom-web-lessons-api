require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { 
  dataMongoose,
  PORT, 
} = require('./utils/config'); 
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { 
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(helmet());

mongoose.connect(dataMongoose);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listen in PORT: ${PORT}`);
})