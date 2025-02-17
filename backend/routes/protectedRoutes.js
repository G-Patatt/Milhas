// routes/protectedRoutes.js
const express = require('express');
const authMiddleware = require('../authMiddleware');  // Importando o middleware
const router = express.Router();

// Rota protegida que só pode ser acessada por usuários autenticados
router.get('/minha-rota-protegida', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à rota protegida!', user: req.user });
});

module.exports = router;
