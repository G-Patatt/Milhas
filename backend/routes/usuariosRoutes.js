const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota de Cadastro de Usuário
router.post('/cadastrar', usuariosController.cadastrar);
router.get('/:id/notificacoes', usuariosController.obterNotificacoes);
router.get('/:id', usuariosController.buscarUsuarioPorId);
router.get("/verificar-email/:token", usuariosController.confirmarEmail);
module.exports = router;
