import express from 'express';
import news from '@admin/controllers/news';
import upload from '@admin/middleware/multer';


const router = express.Router();


router.get('/', news.getAll);
router.get('/:id', news.getOne);
router.post('/ckeditor', upload.single('image'), news.ckEditorAddImage);
router.post('/', upload.single('img'), news.create);
router.put('/:id', upload.single('img'), news.update);
router.delete('/ckeditor', news.ckEditorDeleteImage);
router.delete('/ck/:dir', news.deleteNoEmptyDir);
router.delete('/:id', news.delete);


module.exports = router;