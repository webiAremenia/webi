// const express = require('express');
// const router = express.Router();
// const upload = require('../../middleware/multer');
// const portfolio = require('../../controllers/portfolio');

import express from 'express';
import portfolio from '../../controllers/portfolio';
import upload from '../../middleware/multer';


const router = express.Router();

router.get('/', portfolio.getAll);
router.get('/:id', portfolio.getOne);
router.post('/',upload.single('img'), portfolio.create);
router.put('/:id',upload.single('img'), portfolio.update);
router.delete('/:id', portfolio.delete);



module.exports = router;