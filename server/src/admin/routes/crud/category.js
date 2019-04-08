// const express = require('express');
// const router = express.Router();
// const category = require('../../controllers/category');

import express from 'express';
import category from '../../controllers/category';


const router = express.Router();


router.get('/', category.getAll);
router.get('/:id', category.getOne);
router.post('/', category.create);
router.put('/:id', category.update);
router.delete('/:id', category.delete);




module.exports = router;