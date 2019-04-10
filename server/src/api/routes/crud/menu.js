import express from 'express';
import menu from '../../controllers/menu'

const router = express.Router();

router.get('/', menu.getAll);
router.get('/:id', menu.getOne);

module.exports = router;