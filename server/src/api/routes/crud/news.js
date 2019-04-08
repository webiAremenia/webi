import express from 'express';
import news from '../../controllers/news'

const router = express.Router();

router.get('/', news.getAll);
router.get('/:id', news.getOne);

module.exports = router;