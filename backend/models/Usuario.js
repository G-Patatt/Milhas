const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Conexão com o banco de dados

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  milhas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  // Milhas iniciais
  },
  notificacoes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  // Notificações iniciais
  },
}, {
  tableName: 'usuarios',
  timestamps: true,  // Ativa a criação e atualização automáticas de createdAt e updatedAt
});

module.exports = Usuario;  // Certifique-se de que o modelo está sendo exportado corretamente
