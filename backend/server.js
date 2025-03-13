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
  

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Teste de Conexão com o Banco de Dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

// Sincronização do Banco de Dados
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

// Usar as rotas
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api', milhasRoutes);
app.use('/api/negociacao', negociacaoRoutes);
app.use('/api', loginRoutes);
app.use('/api/garantias', garantiaRoutes); 
app.use('/api', reservaRoutes);
