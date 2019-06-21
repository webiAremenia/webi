import express from 'express';
import media from '@admin/controllers/media';
import upload from '@admin/middleware/multer';

const router = express.Router();


router.get('/', media.getAll);
router.get('/:id', media.getOne);
router.post('/', upload.single('img'), media.create);
router.put('/:id', upload.single('img'), media.update);
router.delete('/:id', media.delete);


module.exports = router;