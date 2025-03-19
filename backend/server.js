// server.js
const express = require('express');
const cors = require('cors');

const sequelize = require('./database');  // Conexão com o banco de dados
const ofertasRoutes = require('./routes/ofertasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const milhasRoutes = require('./routes/milhasRoutes');
const negociacaoRoutes = require('./routes/negociacaoRoutes');
const loginRoutes = require('./routes/loginRoutes');
const garantiaRoutes = require('./routes/garantiaRoutes');
const reservaRoutes = require('./routes/paymentRoutes');
const cleanIndexes = require("./cleanIndexes.js");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Executar a limpeza de índices antes de iniciar o servidor
cleanIndexes()
  .then(() => {
    console.log("🔍 Índices verificados e limpos!");
    
    // Teste de Conexão com o Banco de Dados
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('✅ Conexão com o banco de dados bem-sucedida!');
    
    // Sincronização do Banco de Dados
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Banco de dados sincronizado');
    
    // Iniciar o servidor após tudo estar pronto
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao iniciar o servidor:', error);
  });

// Usar as rotas
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api', milhasRoutes);
app.use('/api/negociacao', negociacaoRoutes);
app.use('/api', loginRoutes);
app.use('/api/garantias', garantiaRoutes); 
app.use('/api', reservaRoutes);
