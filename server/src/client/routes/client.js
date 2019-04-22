import express from 'express';
import controller from '../controllers/client';
import invoice from '../controllers/invoice';
import isAdmin from '../../admin/middleware/check-auth';
import checkAuth from '../_middleware/client-check-auth';

const router = express.Router();



router.post('/', isAdmin ,controller.createAccount);
router.get('/', isAdmin ,controller.getAll);
router.put('/:id', isAdmin ,controller.updateClient);
router.get('/password/:id', isAdmin ,controller.createPasswordAndSend);

router.post('/login', controller.login);

router.use('/', checkAuth);

router.post('/change-password', controller.changePass);

router.post('/invoice', invoice.create);



module.exports = router;