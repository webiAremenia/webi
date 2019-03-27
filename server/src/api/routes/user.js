import express from 'express';
import checkAuth from '../_middleware/check-auth';
import multer from 'multer';
import userController from '../controllers/user/user';

const router = express.Router();




//========================================================
//=================== Multer =============================
//========================================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url.indexOf('invitation') >= 0)
            cb(null, './src/_uploads/invitation');
        else if (req.url.indexOf('gift') >= 0)
            cb(null, './src/_uploads/gifts');
        else cb(null, './src/_uploads/users');
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, (`${Date.now()}-${file.originalname}`));

    }
});
const upload = multer({storage: storage});
//========== multer ^ ===========

//========================================================
//================= User Routes ==========================
//========================================================


router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.use('/', checkAuth);// grouping routes with checkAuth //

module.exports = router;
