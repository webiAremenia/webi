import express from 'express';
import portfolio from '../../controllers/portfolio'

const router = express.Router();

router.get('/', portfolio.getAll);
router.get('/:id', portfolio.getOne);

module.exports = router;