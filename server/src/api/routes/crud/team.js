import express from 'express';
import team from '../../controllers/team'

const router = express.Router();

router.get('/', team.getAll);
router.get('/:id', team.getOne);

module.exports = router;