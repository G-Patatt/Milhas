const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Conexão com o banco de dados

const Usuario = sequelize.define(
  "Usuario",
  {
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
    telefone: {
      type: DataTypes.STRING(20), // Suporta formatos como (51) 99949-9280
      allowNull: true,
    },
    milhas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    notificacoes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avaliacao: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    qtdAvaliacoes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    email_verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

module.exports = Usuario;
