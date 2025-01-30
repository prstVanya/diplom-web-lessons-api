const Teacher = require('../models/Session/Teacher');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({});
    return res.status(200).json(teachers);
  } catch (err) {
    return next(err);
  }
}

module.exports.createTeacher = async (req, res, next) => {
  const { name  } = req.body;
  try {
    const teacher = new Teacher({ name, subjects: req.subject._id, });
    const saveTeacher = await teacher.save();
    return res.status(201).json(saveTeacher);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Неккоректные данные'));
    }
    return next(err);
  }
}