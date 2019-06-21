import express from 'express';
import portfolio from '@admin/controllers/portfolio';
import upload from '@admin/middleware/multer';


const router = express.Router();

router.get('/', portfolio.getAll);
router.get('/:id', portfolio.getOne);
router.post('/ckeditor',upload.single('image'), portfolio.ckEditorAddImage);
router.post('/', upload.single('img'), portfolio.create);
router.put('/:id', upload.single('img'), portfolio.update);
router.delete('/ckeditor',portfolio.ckEditorDeleteImage);
router.delete('/ck/:dir', portfolio.deleteNoEmptyDir);
router.delete('/:id', portfolio.delete);


module.exports = router;