const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota de Cadastro de Usuário
router.post('/cadastrar', usuariosController.cadastrar);

module.exports = router;
