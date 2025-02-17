// auth.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController'); // Controller para login

// Rota para login
router.post('/login', loginController.login);

module.exports = router;
