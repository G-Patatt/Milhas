const express = require("express");
const {
  postAvaliation,
  getAvaliationById,
  getAllAvaliations,
} = require("../controllers/avaliacoes");
const avaliationRouter = express.Router();

avaliationRouter.post("/:ratedUser", postAvaliation);
avaliationRouter.get("/", getAllAvaliations);
avaliationRouter.get("/:ratedUser", getAvaliationById);

module.exports = avaliationRouter;
