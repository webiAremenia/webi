import express from 'express';
import setting from '../../controllers/setting'

const router = express.Router();

router.get('/', setting.getAll);
router.get('/:id', setting.getOne);

module.exports = router;