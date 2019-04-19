import express from 'express';
import controller from '../controllers/client';
import isAdmin from '../../admin/middleware/check-auth';
import checkAuth from '../_middleware/client-check-auth';

const router = express.Router();



router.post('/', isAdmin ,controller.createAccount);
router.get('/', isAdmin ,controller.getAll);

router.post('/login', controller.login);

router.use('/', checkAuth);

router.post('/change-password', controller.changePass);



module.exports = router;