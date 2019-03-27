const express = require('express');
const router = express.Router();
const upload = require('../configs/multer');


const portfolio = require('../controllers/portfolio');

router.get('/', portfolio.getAll);
router.get('/:id', portfolio.getOne);
router.post('/',upload.single('img'), portfolio.create);
router.put('/:id',upload.single('img'), portfolio.update);
router.delete('/:id', portfolio.delete);



module.exports = router;