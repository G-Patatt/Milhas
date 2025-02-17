const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Conexão com o banco de dados

const Oferta = sequelize.define('Oferta', {
  ofertaId: {  // ID único da oferta
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  preco: {  // Preço da oferta
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  qtdMilhas: {  // Quantidade de milhas necessárias para a oferta
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Relacionamento com a tabela 'Milhas'
  milhasId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'milhas',  // Nome da tabela de milhas
      key: 'milhasid',  // Coluna correspondente na tabela de milhas
    },
    allowNull: true,  // Pode ser nulo
  },
  // Relacionamento com a tabela 'Usuario'
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',  // Nome da tabela de usuários
      key: 'id',           // Coluna correspondente na tabela de usuários
    },
    allowNull: false,  // Não pode ser nulo
  },
  ciaAerea: {  // Companhia aérea associada à oferta
    type: DataTypes.STRING,
    allowNull: false,
  },
  compraOuVenda: {  // Coluna para definir se é uma compra ou venda
    type: DataTypes.ENUM('compra', 'venda'),
    allowNull: false,  // Não pode ser nulo
  },
  confirmada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Por padrão, as ofertas não estão confirmadas
  }
  
}, {
  tableName: 'ofertas',  // Garante que a tabela correta seja usada
  timestamps: false,     // Desativa o uso de createdAt e updatedAt
});

module.exports = Oferta;
