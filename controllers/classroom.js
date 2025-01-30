const Classroom = require('../models/Session/Classroom');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getAllClassrooms = async (req, res, next) => {
  const subject = req.subject._id;
  try {
    const classroom = await Classroom.find({ subject });
    return res.status(200).json(classroom);
  } catch (err) {
    return next(err);
  }
}

module.exports.createClassRoom = async (req, res, next) => {
  const {
    number,
    type,
    classroomId,
  } = req.body;
  try {
    const classroom = new Classroom({
      number,
      type,
      subjects: req.subject._id,
      classroomId,
    });
    const saveRoom = await classroom.save();
    return res.status(201).json(saveRoom);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Неккоректные данные'));
    }
    return next(err);
  }
}