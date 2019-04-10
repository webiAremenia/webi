import express from 'express';
import language from '../../controllers/language'

const router = express.Router();

router.get('/', language.getAll);
router.get('/:id', language.getOne);

module.exports = router;