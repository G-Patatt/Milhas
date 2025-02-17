const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertasController');

// Rota para buscar todas as ofertas (continua válida)
router.get('/', ofertasController.buscarOfertas);  // Agora é '/api/ofertas'

// Rota para buscar uma oferta específica usando o ID
router.get('/:ofertaId', ofertasController.buscarOfertaEspecifica);  // Rota para pegar uma oferta específica

// Rota para pegar uma oferta
router.post('/pegarOferta', ofertasController.pegarOferta);


router.post('/confirmarOferta', ofertasController.confirmarOferta);

router.post('/criarOferta', ofertasController.criarOferta);
module.exports = router;
