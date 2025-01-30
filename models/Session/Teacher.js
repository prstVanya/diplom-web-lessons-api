const mongoose = require('mongoose');

const Teacher = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
      required: true,
    },
  ],
});

module.exports = new mongoose.model('teacher', Teacher);