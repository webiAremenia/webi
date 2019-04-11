import express from 'express';
import page from '../../controllers/page'

const router = express.Router();

router.get('/', page.getAll);
router.get('/:id', page.getOne);

module.exports = router;