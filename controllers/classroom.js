const Classroom = require('../models/Session/Classroom');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getAllClassrooms = async (req, res, next) => {
  try {
    const classroom = await Classroom.find({});
    return res.status(200).json(classroom);
  } catch (err) {
    return next(err);
  }
}

module.exports.createClassRoom = async (req, res, next) => {
  const {
    number,
    type,
  } = req.body;
  try {
    const classroom = new Classroom({
      number,
      type,
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