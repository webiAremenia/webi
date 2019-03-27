const express = require('express');
const router = express.Router();
const upload = require('../../configs/multer');


const media = require('../../controllers/media');

router.get('/', media.getAll);
router.get('/:id', media.getOne);
router.post('/',upload.single('img'), media.create);
router.put('/:id',upload.single('img'), media.update);
router.delete('/:id', media.delete);





module.exports = router;