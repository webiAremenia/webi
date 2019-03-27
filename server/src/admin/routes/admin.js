import express from 'express';

import checkAuth from '../middleware/check-auth';

import controller from '../controller/admin';

import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url.indexOf('invitation') < 0)
            cb(null, './src/_uploads/users');
        else
            cb(null, './src/_uploads/organization');
    },
    filename: function (req, file, cb) {
        cb(null, (`${Date.now()}-${file.originalname}`))
    }
});
const upload = multer({storage: storage});

//==========================================================================
//=======================  Admin CRUD  =====================================
//==========================================================================

router.post('/login', controller.login);
router.use('/', checkAuth );
// Grouping routes
router.post('/create' ,controller.create);
router.put('/update/:adminId', controller.update);
router.delete('/delete/:adminId', controller.delete);


module.exports = router;
