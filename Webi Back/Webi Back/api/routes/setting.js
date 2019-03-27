const express = require('express');
const router = express.Router();


const setting = require('../controllers/setting');


router.get('/', setting.getAll);
router.get('/:id', setting.getOne);
router.post('/',setting.create);
router.put('/:id',setting.update);




module.exports = router;