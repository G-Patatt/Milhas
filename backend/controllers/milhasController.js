const Milhas = require('../models/Milhas');  // Importa o modelo de milhas

// Função para buscar todas as milhas
const buscarMilhas = async (req, res) => {
  try {
    const milhas = await Milhas.findAll();  // Recupera todas as milhas
    res.json(milhas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar milhas', details: error.message });
  }
};

// Função para adicionar milhas
const adicionarMilhas = async (req, res) => {
  const { usuarioid, ofertaid, qtdMilhas, ciaAerea } = req.body;

  try {
    const milhas = await Milhas.create({
      usuarioid,
      ofertaid,
      qtdMilhas,
      ciaAerea
    });

    // Resposta de sucesso com a mensagem
    res.status(201).json({
      message: 'Milhas adicionadas com sucesso!',
      milhas: milhas  // Retorna o objeto de milhas criado
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar milhas', details: error.message });
  }
};

// Função para atualizar as milhas de um usuário
const atualizarMilhas = async (req, res) => {
  const { id } = req.params;
  const { usuarioid, ofertaid, qtdMilhas, ciaAerea } = req.body;

  try {
    const milha = await Milhas.findByPk(id);
    if (!milha) {
      return res.status(404).json({ error: 'Milhas não encontradas' });
    }

    // Atualiza os dados das milhas
    milha.usuarioid = usuarioid;
    milha.ofertaid = ofertaid;
    milha.qtdMilhas = qtdMilhas;
    milha.ciaAerea = ciaAerea;
    await milha.save();

    res.json(milha);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar milhas', details: error.message });
  }
};

// Função para deletar as milhas
const deletarMilhas = async (req, res) => {
  const { id } = req.params;

  try {
    const milha = await Milhas.findByPk(id);
    if (!milha) {
      return res.status(404).json({ error: 'Milhas não encontradas' });
    }

    await milha.destroy();  // Deleta as milhas
    res.status(204).send();  // Retorna status de sucesso sem corpo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar milhas', details: error.message });
  }
};

module.exports = {
  buscarMilhas,
  adicionarMilhas,
  atualizarMilhas,
  deletarMilhas
};
