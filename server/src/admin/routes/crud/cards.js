import express from 'express';
import cards from '@admin/controllers/cards';


const router = express.Router();


router.get('/', cards.getAll);
router.get('/:id', cards.getOne);
router.post('/', cards.create);
router.put('/:id', cards.update);
router.delete('/:id', cards.delete);


module.exports = router;