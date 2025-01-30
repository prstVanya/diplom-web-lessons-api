const mongoose = require('mongoose');

const Schedule = mongoose.Schema({
  day: { 
    type: String,
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true 
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classroom',
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher',
    required: true,
  },
});

module.exports = new mongoose.model('schedule', Schedule);

/*
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseYear: { type: Number, required: true }
});
const Subject = mongoose.model('Subject', subjectSchema);

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});
const Teacher = mongoose.model('Teacher', teacherSchema);

const classroomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true }
});
const Classroom = mongoose.model('Classroom', classroomSchema);

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
});
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Subject, Teacher, Classroom, Schedule };

*/