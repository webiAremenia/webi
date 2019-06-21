import express from 'express';
import menu from '@admin/controllers/menu';

const router = express.Router();


router.get('/', menu.getAll);
router.get('/pc', menu.getPagesAndCategories);
router.get('/:id', menu.getOne);
router.post('/', menu.create);
router.put('/:id', menu.update);
router.put('/', menu.updateMenu);
router.delete('/:id', menu.delete);


module.exports = router;