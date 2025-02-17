// controllers/negociacaoController.js
const Negociacao = require('../models/Negociacao');  // Importa o modelo de negociação
const Garantia = require('../models/Garantia');  // Importando o modelo Garantia
const Oferta = require('../models/Oferta');
const { Op } = require('sequelize');  // Importar Op do Sequelize


// Função para buscar todas as negociações
const buscarNegociacoes = async (req, res) => {
  try {
    const negociacoes = await Negociacao.findAll();  // Recupera todas as negociações
    res.json(negociacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar negociações', details: error.message });
  }
};

// Função para adicionar uma negociação
const adicionarNegociacao = async (req, res) => {
  const { usuarioIdComprador, usuarioIdVendedor, ofertaId } = req.body;

  try {
    // Adiciona a nova negociação no banco
    const novaNegociacao = await Negociacao.create({
      usuarioIdComprador,  // ID do comprador
      usuarioIdVendedor,   // ID do vendedor
      ofertaId,            // ID da oferta associada à negociação
    });
    
    // Resposta de sucesso
    res.status(201).json({
      message: 'Negociação criada com sucesso!',
      negociacao: novaNegociacao
    });
  } catch (error) {
    // Caso ocorra um erro
    res.status(500).json({ error: 'Erro ao adicionar negociação', details: error.message });
  }
};

// Função para buscar uma negociação pelo ID, incluindo a garantia associada
const buscarNegociacaoPorId = async (req, res) => {
  const { id } = req.params;
  const { ofertaId } = req.query;  // Agora, capturando o ofertaId da query string
  
  try {
    // Busca a negociação
    const negociacao = await Negociacao.findByPk(id);

    if (!negociacao) {
      return res.status(404).json({ error: 'Negociação não encontrada.' });
    }

    // Agora, chamamos a função que obtém a garantia relacionada à negociação e oferta
    const garantia = await Garantia.findOne({
      where: { 
        negociacaoId: id, 
        ofertaId: ofertaId  // Verificando também o ofertaId
      }
    });

    // Incluímos a garantia no objeto de resposta
    const resultado = { negociacao, garantia };

    res.json(resultado);  // Retorna a negociação com a garantia associada, se existir
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar negociação.', details: error.message });
  }
};
// Função para buscar negociações do usuário autenticado
const getNegociacoesPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Buscar todas as negociações do usuário
    const negociacoes = await Negociacao.findAll({
      where: { 
        [Op.or]: [{ usuarioIdComprador: usuarioId }, { usuarioIdVendedor: usuarioId }]
      }
    });

    if (negociacoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma negociação encontrada para este usuário.' });
    }

    // Buscar as ofertas correspondentes
    const ofertas = await Promise.all(
      negociacoes.map(async negociacao => {
        const oferta = await Oferta.findOne({ where: { ofertaId: negociacao.ofertaId } }); // Atualizado aqui
        return { negociacao, oferta };
      })
    );

    return res.status(200).json(ofertas);
  } catch (err) {
    console.error('Erro ao buscar negociações:', err.message);
    return res.status(500).json({ message: 'Erro ao buscar negociações', error: err.message });
  }
};


module.exports = {
  buscarNegociacoes,
  adicionarNegociacao,
  buscarNegociacaoPorId,
  getNegociacoesPorUsuario
};
