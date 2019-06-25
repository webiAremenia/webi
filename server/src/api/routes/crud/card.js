import express from 'express';
import card from '../../controllers/card'

const router = express.Router();

router.get('/', card.getAll);
router.get('/:id', card.getOne);

module.exports = router;