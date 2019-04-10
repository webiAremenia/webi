import express from 'express';
import category from '../../controllers/category'

const router = express.Router();

router.get('/', category.getAll);
router.get('/:id', category.getOne);

module.exports = router;