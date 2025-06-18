const { Joi, celebrate } = require('celebrate');

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateSubject = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    course: Joi.number().required().min(1).max(4),
    type: Joi.string().required(),
  }),
});

module.exports.validationCreateClassroom = celebrate({
  body: Joi.object().keys({
    number: Joi.number().required().min(1).max(420),
    type: Joi.string().required().min(4).max(30),
  }),
});

module.exports.validationCreateTeacher = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(50),
  }),
});