// routes/mercadoPagoRoutes.js
const express = require('express');
const { gerarToken } = require('../controllers/paymentController');
const router = express.Router();

router.post('/mercadopago/token', gerarToken);

module.exports = router;
