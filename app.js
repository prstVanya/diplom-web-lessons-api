require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

const corsOption = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:5173'
  ],
  credentials: true,
}

app.use(cors(corsOption));

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
