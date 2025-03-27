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
    ratingUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "avaliacoes",
    timestamps: false,
  }
);

module.exports = Avaliacoes;
