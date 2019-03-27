import express from 'express';
const router = express.Router();

import media from './crud/media';
import page from './crud/page';
import portfolio from './crud/portfolio';
import post from './crud/post';
import setting from './crud/setting';
import team from './crud/team';


router.use('/media', media);
router.use('/page', page);
router.use('/portfolio', portfolio);
router.use('/post', post);
router.use('/setting', setting);
router.use('/team', team);

module.exports = router;