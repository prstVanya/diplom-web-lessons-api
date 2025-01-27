require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { dataMongoose, PORT } = require('./utils/config'); 

const app = express();
app.use(express.json());
mongoose.connect(dataMongoose);


app.listen(PORT, () => {
  console.log(`Listen in PORT: ${PORT}`);
})