const express = require('express');
const router = express.Router();
const garantiaController = require('../controllers/garantiaController');

// Rotas para manipulação de garantias
router.post('/', garantiaController.criarGarantia); // Criar uma nova garantia
router.get('/', garantiaController.listarGarantias); // Listar todas as garantias
router.get('/:id', garantiaController.obterGarantiaPorId); // Obter uma garantia específica
router.put('/:id', garantiaController.atualizarGarantia); // Atualizar uma garantia
router.delete('/:id', garantiaController.excluirGarantia); // Excluir uma garantia
router.get('/negociacao/:negociacaoId', garantiaController.obterGarantiaPorNegociacao);

module.exports = router;
