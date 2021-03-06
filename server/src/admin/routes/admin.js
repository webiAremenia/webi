import express from 'express';

import checkAuth from '../middleware/check-auth';

import controller from '../controllers/admin';
import media from './crud/media';
import page from './crud/page';
import portfolio from './crud/portfolio';
import setting from './crud/setting';
import team from './crud/team';
import menu from './crud/menu';
import category from './crud/category';
import language from './crud/language';
import news from './crud/news';
import serviceCards from './crud/cards';
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

router.post('/create', controller.create);
router.post('/login', controller.login);
router.use('/', checkAuth);
// Grouping routes

router.put('/update/:adminId', controller.update);
router.delete('/delete/:adminId', controller.delete);


router.use('/media', media);
router.use('/page', page);
router.use('/portfolio', portfolio);
router.use('/setting', setting);
router.use('/team', team);
router.use('/menu', menu);
router.use('/category', category);
router.use('/language', language);
router.use('/news', news);
router.use('/cards-type-one', serviceCards);


module.exports = router;
