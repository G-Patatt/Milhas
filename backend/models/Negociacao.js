// models/Negociacao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Conexão com o banco de dados

const Negociacao = sequelize.define('Negociacao', {
  negociacaoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioIdComprador: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',  // Nome da tabela de usuários
      key: 'id',           // Coluna correspondente na tabela de usuários
    },
    allowNull: false,
  },
  usuarioIdVendedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',  // Nome da tabela de usuários
      key: 'id',           // Coluna correspondente na tabela de usuários
    },
    allowNull: false,
  },
  idPagamento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ofertaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ofertas',  // Nome da tabela de ofertas
      key: 'ofertaId',   // Coluna correspondente na tabela de ofertas
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'Aguardando garantias por parte comprador',
      'Aguardando garantias por parte vendedor',
      'Comprador Notificado',
      'Vendedor Notificado',
      'Verificando Interesse Vendedor',   
      'Comprador Alocou Garantias',      
      'Comprador gerou o link mas ainda não pagou',
      'Vendedor gerou o link mas ainda não pagou',
      'Vendedor Alocou Garantias',
      'Aguardando comprovante de passagem e código da reserva pelo vendedor',
      'Esperando comprador confirmar o recebimento da passagem no e-mail',    
      'Finalizada parcialmente, aguardando 24h para evitar cancelamento de passagem',
      'Garantias devolvidas a ambos',
      'Dinheiro transferido ao vendedor',
      'Negociação Finalizada',
    ),
    type: DataTypes.STRING(255),  
    allowNull: true  // Garantir que o status seja sempre fornecido

  }
}, {
  tableName: 'negociacao',  // Nome da tabela
  timestamps: false,        // Desativa o uso de createdAt e updatedAt
});

module.exports = Negociacao;
    