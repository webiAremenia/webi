const express = require('express');
const router = express.Router();
const upload = require('../configs/multer');


const team = require('../controllers/team');

router.get('/', team.getAll);
router.get('/:id', team.getOne);
router.post('/',upload.single('img'), team.create);
router.put('/:id',upload.single('img'), team.update);
router.delete('/:id', team.delete);



module.exports = router;