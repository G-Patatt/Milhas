const Garantia = require('../models/Garantia'); // Modelo Garantia

// Criar uma nova garantia
const criarGarantia = async (req, res) => {
  const { valor, usuarioId, negociacaoId, ofertaId } = req.body; // Incluímos ofertaId

  try {
    const novaGarantia = await Garantia.create({ valor, usuarioId, negociacaoId, ofertaId }); // Incluímos ofertaId aqui
    res.status(201).json(novaGarantia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar garantia', details: error.message });
  }
};


// Listar todas as garantias
const listarGarantias = async (req, res) => {
  try {
    const garantias = await Garantia.findAll();
    res.status(200).json(garantias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar garantias', details: error.message });
  }
};

// Obter uma garantia específica por ID
const obterGarantiaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const garantia = await Garantia.findByPk(id);
    if (!garantia) {
      return res.status(404).json({ error: 'Garantia não encontrada' });
    }
    res.status(200).json(garantia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar garantia', details: error.message });
  }
};

// Atualizar uma garantia
const atualizarGarantia = async (req, res) => {
  const { id } = req.params;
  const { valor, usuarioId, negociacaoId } = req.body;

  try {
    const garantia = await Garantia.findByPk(id);
    if (!garantia) {
      return res.status(404).json({ error: 'Garantia não encontrada' });
    }

    // Atualizar os campos da garantia
    garantia.valor = valor;
    garantia.usuarioId = usuarioId;
    garantia.negociacaoId = negociacaoId;
    await garantia.save();

    res.status(200).json(garantia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar garantia', details: error.message });
  }
};

// Excluir uma garantia
const excluirGarantia = async (req, res) => {
  const { id } = req.params;

  try {
    const garantia = await Garantia.findByPk(id);
    if (!garantia) {
      return res.status(404).json({ error: 'Garantia não encontrada' });
    }

    await garantia.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir garantia', details: error.message });
  }
};

// Buscar garantia por negociacaoId
const obterGarantiaPorNegociacao = async (req, res) => {
  const { negociacaoId } = req.params;  // Recebe o negociacaoId da URL

  try {
    // Busca a garantia associada à negociacaoId
    const garantia = await Garantia.findOne({
      where: {
        negociacaoId: negociacaoId
      }
    });

    // Caso não encontre a garantia, retorna erro 404
    if (!garantia) {
      return res.status(404).json({ error: 'Garantia não encontrada para essa negociação' });
    }

    // Retorna a garantia encontrada
    res.status(200).json(garantia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar garantia', details: error.message });
  }
};


module.exports = {
  criarGarantia,
  listarGarantias,
  obterGarantiaPorId,
  atualizarGarantia,
  excluirGarantia,
  obterGarantiaPorNegociacao
};
