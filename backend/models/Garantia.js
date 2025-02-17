const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Garantia = sequelize.define('Garantia', {
  garantiaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  usuarioId: { // Relacionamento com a tabela Usuario
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios', // Nome da tabela de usuários
      key: 'id',         // Coluna correspondente na tabela de usuários
    },
    allowNull: false,
  },
  negociacaoId: { // Relacionamento com a tabela Negociacao
    type: DataTypes.INTEGER,
    references: {
      model: 'negociacao', // Nome da tabela de negociações
      key: 'negociacaoId',  // Coluna correspondente na tabela de negociaçõesassas  asa
    },
    allowNull: false,
  },
  ofertaId: { // Relacionamento com a tabela Oferta
    type: DataTypes.INTEGER,
    references: {
      model: 'ofertas', // Nome da tabela de ofertas
      key: 'ofertaId',  // Coluna correspondente na tabela de ofertas
    },
    allowNull: false,
  },
}, {
  tableName: 'garantias',
  timestamps: true,
});

module.exports = Garantia;
