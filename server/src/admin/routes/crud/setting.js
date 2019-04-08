// const express = require('express');
// const router = express.Router();
// const setting = require('../../controllers/setting');


import express from 'express';
import setting from '../../controllers/setting';


const router = express.Router();


router.get('/', setting.getAll);
router.get('/:id', setting.getOne);
router.post('/',setting.create);
router.put('/:id',setting.update);




module.exports = router;