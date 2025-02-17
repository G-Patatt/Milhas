const express = require('express');
const router = express.Router();
const negociacaoController = require('../controllers/negociacaoController');
const authMiddleware = require('../authMiddleware');  // Middleware de autenticação

// Buscar todas as negociações
router.get('/', negociacaoController.buscarNegociacoes);

// Buscar negociações do usuário autenticado (com base no token JWT)
router.get('/usuario', authMiddleware, negociacaoController.getNegociacoesPorUsuario);  // Altere para não precisar de :usuarioId na URL

// Buscar detalhes de uma negociação específica
router.get('/:id', negociacaoController.buscarNegociacaoPorId);

// Rota para criar uma nova negociação  
router.post('/', negociacaoController.adicionarNegociacao);



module.exports = router;
