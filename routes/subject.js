const router = require('express').Router();
const {
  createSubject,
  getAllSubjects,
} = require('../controllers/subject');

router.get('/subjects', getAllSubjects);
router.post('/subjects', createSubject);

module.exports = router;