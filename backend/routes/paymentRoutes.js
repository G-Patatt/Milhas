// routes/mercadoPagoRoutes.js
const express = require('express');
const { gerarToken, criarPreference, capturarPagamento, cancelarPagamento} = require('../controllers/paymentController');
const router = express.Router();

router.post('/mercadopago/token', gerarToken);
router.post('/mercadopago/preference', criarPreference);
router.post('/mercadopago/webhook', capturarPagamento);
router.put('/mercadopago/cancel/:id', cancelarPagamento);


module.exports = router;
