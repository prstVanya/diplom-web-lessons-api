const mongoose = require('mongoose');

const Subject = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  course: {
    type: Number,
    required: true,
  }
})

module.exports = new mongoose.model('subject', Subject);