const Subject = require('../models/Session/Subject');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({});
    return res.status(200).json(subjects);
  } catch (err) {
    return next(err);
  }
}

module.exports.createSubject = async (req, res, next) => {
  const { name, course, } = req.body;
  try {
    const subject = new Subject({ name, course, });
    const saveSubject = await subject.save();
    return res.status(201).json(saveSubject);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Неккоректные данные'));
    }
    return next(err);
  }
}