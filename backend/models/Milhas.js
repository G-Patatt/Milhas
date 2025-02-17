const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Conexão com o banco de dados
const Usuario = require('./Usuario');  // Verifique se o caminho está correto

const Milhas = sequelize.define('Milhas', {
  milhasid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ofertaid: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  qtdMilhas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ciaAerea: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'milhas',  // Nome da tabela no banco de dados (em minúsculas)
  timestamps: false     // Não usa createdAt e updatedAt
});

// Definindo o relacionamento após ambos os modelos estarem importados
Milhas.belongsTo(Usuario, { foreignKey: 'usuarioid', as: 'usuario' });

module.exports = Milhas;
