import express from 'express';
import setting from '@admin/controllers/setting';


const router = express.Router();


router.get('/', setting.getAll);
router.get('/:id', setting.getOne);
router.post('/', setting.create);
router.put('/:id', setting.update);


module.exports = router;