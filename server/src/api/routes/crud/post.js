const express = require('express');
const router = express.Router();
const upload = require('../../configs/multer');


const post = require('../../controllers/post');


router.get('/all', post.getAll);
router.get('/one/:id', post.getOne);
router.post('/create',upload.single('img'), post.create);
router.put('/update/:id',upload.single('img'), post.update);
router.delete('/delete/:id', post.delete);



module.exports = router;