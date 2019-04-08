import express from 'express';
import language from '../../controllers/language';

const router = express.Router();


router.get('/', language.getAll);
router.get('/:id', language.getOne);
router.post('/', language.create);
router.put('/:id', language.update);
router.delete('/:id', language.delete);


module.exports = router;