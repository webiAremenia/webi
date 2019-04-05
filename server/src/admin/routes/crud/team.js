// const express = require('express');
// const router = express.Router();
// const upload = require('../../middleware/multer');
// const team = require('../../controllers/team');

import express from 'express';
import team from '../../controllers/team';
import upload from '../../middleware/multer';


const router = express.Router();


router.get('/', team.getAll);
router.get('/:id', team.getOne);
router.post('/',upload.single('img'), team.create);
router.put('/:id',upload.single('img'), team.update);
router.put('/', team.updateList);
router.delete('/:id', team.delete);

// router.put('/', (req,res)=>{
//     console.log('body ', req.body)
// });

module.exports = router;