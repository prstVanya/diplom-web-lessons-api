const router = require('express').Router();
const {
  getAllGroups,
  createGroup,
  deleteGroup,
  getGroupById,
} = require('../controllers/group');

router.get('/groups', getAllGroups);
router.get('/groups/:id', getGroupById);
router.post('/groups', createGroup);
router.delete('/groups/:id', deleteGroup);

module.exports = router;