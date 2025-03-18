const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Avaliacoes = sequelize.define(
  "Avalicoes",
  {
    avaliacaoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ratedUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "avaliacoes",
    timestamps: true,
  }
);

module.exports = Avaliacoes;
