// const express = require('express');
// const router = express.Router();
// const upload = require('../../middleware/multer');
// const page = require('../../controllers/page');

import express from 'express';
import news from '../../controllers/news';
import upload from '../../middleware/multer';


const router = express.Router();


router.get('/', news.getAll);
router.get('/:id', news.getOne);
router.post('/',upload.single('img'), news.create);
router.put('/:id',upload.single('img'), news.update);
router.delete('/:id', news.delete);





module.exports = router;