import express from 'express';
import media from '../../controllers/media'

const router = express.Router();

router.get('/', media.getAll);
router.get('/:id', media.getOne);

module.exports = router;