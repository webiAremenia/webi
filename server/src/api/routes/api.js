import express from 'express';
import contactController from '../controllers/contact'
const router = express.Router();

import media from './crud/media';
import page from './crud/page';
import portfolio from './crud/portfolio';
import setting from './crud/setting';
import team from './crud/team';
import news from './crud/news';
import menu from './crud/menu';
import language from './crud/language';
import category from './crud/category';
import card from './crud/card';
import eCommerce from './pages/ecommerce';



router.use('/media', media);
router.use('/page', page);
router.use('/portfolio', portfolio);
router.use('/setting', setting);
router.use('/team', team);
router.use('/news', news);
router.use('/menu', menu);
router.use('/language', language);
router.use('/category', category);
router.use('/cards', card);
router.use('/ecommerce', eCommerce);


router.post('/contact', contactController.sendMail);


module.exports = router;