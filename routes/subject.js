const router = require('express').Router();
const {
  createSubject,
  getSubjectsByGroup,
  deleteSubject,
} = require('../controllers/subject');

router.get('/subject', getSubjectsByGroup);
router.post('/subject', createSubject);
router.delete('/subject/:id', deleteSubject);