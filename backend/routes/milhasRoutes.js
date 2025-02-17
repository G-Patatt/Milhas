// routes/milhasRoutes.js

const express = require('express');
const router = express.Router();
const milhasController = require('../controllers/milhasController');

// Rota para buscar todas as milhas
router.get('/milhas', milhasController.buscarMilhas);

// Rota para adicionar novas milhas
router.post('/milhas', milhasController.adicionarMilhas);

// Rota para atualizar as milhas de um usuário
router.put('/milhas/:id', milhasController.atualizarMilhas);

// Rota para excluir milhas (se necessário)
router.delete('/milhas/:id', milhasController.deletarMilhas);

module.exports = router;
