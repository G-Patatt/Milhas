const express = require("express");
const {
  postAvaliation,
  getAllAvaliation,
  getAvaliationById,
} = require("../controllers/avaliacaoController");
const router = express.Router();

router.post("/:id", postAvaliation);
router.get("/", getAllAvaliation);
router.get("/:id", getAvaliationById);

module.exports = router;
