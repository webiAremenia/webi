import express from 'express';
import page from '@admin/controllers/page';
import upload from '@admin/middleware/multer';


const router = express.Router();


router.get('/', page.getAll);
router.get('/:id', page.getOne);
router.post('/ckeditor', upload.single('image'), page.ckEditorAddImage);
router.post('/', upload.single('img'), page.create);
router.put('/:id', upload.single('img'), page.update);
router.delete('/ckeditor', page.ckEditorDeleteImage);
router.delete('/ck/:dir', page.deleteNoEmptyDir);
router.delete('/:id', page.delete);


module.exports = router;