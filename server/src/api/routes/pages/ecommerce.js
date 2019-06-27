import express from 'express';
import commerce from '../../controllers/pages/ecommerce'

const router = express.Router();

router.post('/send-email', commerce.sendEmail);

module.exports = router;