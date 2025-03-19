const Usuario = require("../models/Usuario");
const Avaliacoes = require("../models/Avaliacoes");
const { where } = require("sequelize");

const postAvaliation = async (req, res) => {
  try {
    const { ratedUser } = req.params;
    const { rating, createdAt } = req.body;

    if (!ratedUser || !rating) {
      return res.status(401).json({ error: "Dados inválidos" });
    }

    const response = await Avaliacoes.create({
      ratedUser,
      rating,
      createdAt,
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    return res.status(500).json({ error: "Erro ao criar avaliação" });
  }
};

const getAllAvaliations = async (_, res) => {
  try {
    const avalicaoes = await Avaliacoes.findAll();

    const avaliacoesGroup = avalicaoes.reduce((acc, avaliation) => {
      if (!acc[avaliation.ratedUser]) {
        acc[avaliation.ratedUser] = [];
      }
      acc[avaliation.ratedUser].push(avaliation);

      return acc;
    }, {});

    const totalRating =
      avaliacoesGroup.reduce((acc, avaliation) => {
        return acc + avaliation.rating;
      }, 0) / ava.length;

    res.status(200).json(avaliacoesGroup);
  } catch (error) {}
};

const getAvaliationById = async (req, res) => {
  try {
    const { ratedUser } = req.params;
    const usersAvaliation = await Avaliacoes.findAll({
      where: { ratedUser: ratedUser },
    });

    if (usersAvaliation.length === 0) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    const totalRating =
      usersAvaliation.reduce((acc, avaliation) => {
        return acc + avaliation.rating;
      }, 0) / usersAvaliation.length;

    res.status(200).json({ usersAvaliation, totalRating });
  } catch (error) {}
};

module.exports = {
  postAvaliation,
  getAllAvaliations,
  getAvaliationById,
};
