const router = require('express').Router();
const {
  createTeacher,
  getAllTeachers
} = require('../controllers/teacher');

router.get('/teachers', getAllTeachers);
router.post('/teachers', createTeacher);

module.exports = router;