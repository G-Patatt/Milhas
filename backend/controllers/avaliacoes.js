import { create } from "form";
import Usuario from "../models/Usuario";

export async function postAvaliation(req, res) {
  try {
    const { userId, rating } = req.body;

    if (!userId || !rating) {
      return res.status(401).json({ error: "Dados inválidos" });
    }

    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const response = await create({
      userId,
      rating,
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    return res.status(500).json({ error: "Erro ao criar avaliação" });
  }
}

export async function getAvaliationById(req, res) {
  try {
    const avalicaoes = await Usuario.findAll({
      include: [
        {
          model: Usuario,
          as: "user",
        },
      ],
    });

    res.status(200).json(avalicaoes);
  } catch (error) {}
}

export async function getAllAvaliation(req, res) {
  try {
    const { userId } = req.params;
    const usersAvaliation = await Usuario.findByPk(userId, {
      include: [
        {
          model: Usuario,
          as: "user",
        },
      ],
    });

    if (!usersAvaliation) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }
    res.status(200).json(usersAvaliation);
  } catch (error) {}
}
