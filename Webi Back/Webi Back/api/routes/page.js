const express = require('express');
const router = express.Router();
const upload = require('../configs/multer');


const page = require('../controllers/page');


router.get('/', page.getAll);
router.get('/:id', page.getOne);
router.post('/',upload.single('img'), page.create);
router.put('/:id',upload.single('img'), page.update);
router.delete('/:id', page.delete);





module.exports = router;