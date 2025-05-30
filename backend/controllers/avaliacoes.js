const Avaliacoes = require("../models/Avaliacoes");
const Usuario = require("../models/Usuario");

const postAvaliation = async (req, res) => {
  try {
    const { ratedUser } = req.params;
    const { rating, ratingUser, comment } = req.body;

    if (!ratedUser || !rating || !ratingUser) {
      return res.status(401).json({ error: "Dados inválidos" });
    }

    const user = await Usuario.findOne({ where: { id: ratedUser } });

    if (!user) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    const response = await Avaliacoes.create({
      ratedUser,
      rating,
      ratingUser,
      comment,
    });

    if (!response) {
      return res.status(500).json({ error: "Erro ao criar avaliação" });
    }

    const totalRating =
      (user.avaliacao * user.qtdAvaliacoes + rating) / (user.qtdAvaliacoes + 1);

    await Usuario.update(
      { avaliacao: totalRating, qtdAvaliacoes: user.qtdAvaliacoes + 1 },
      { where: { id: ratedUser } }
    );

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
