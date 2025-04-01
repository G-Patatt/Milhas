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
  const { usuarioIdComprador, usuarioIdVendedor, ofertaId, status } = req.body;

  try {
    // Adiciona a nova negociação no banco
    const novaNegociacao = await Negociacao.create({
      usuarioIdComprador,  // ID do comprador
      usuarioIdVendedor,   // ID do vendedor
      ofertaId,            // ID da oferta associada à negociação
      status,
    });
    
   
    // Resposta de sucesso
    return novaNegociacao;

  
   
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
      return res.status(208).json({ message: 'Nenhuma negociação encontrada para este usuário.' });
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

const atualizarStatusNegociacao = async (req, res) => {
  try {
    const { id } = req.params;  // Obtém o ID da negociação pela URL
    const { status } = req.body; // Obtém o novo status do corpo da requisição
    console.log("Cheguei no back, id: " + id + "Status: " + status);
    // Verifica se o status enviado é um dos valores permitidos no ENUM
    const statusPermitidos = [
      'Aguardando garantias por parte comprador',
      'Aguardando garantias por parte vendedor',
      'Comprador Notificado',
      'Vendedor Notificado',
      'Verificando Interesse Vendedor',   
      'Comprador Alocou Garantias, aguardando vendedor alocar garantias',      
      'Comprador gerou o link mas ainda não pagou',
      'Vendedor gerou o link mas ainda não pagou',
      'Vendedor Alocou Garantias',
      'Aguardando comprovante de passagem e código da reserva pelo vendedor',
      'Esperando comprador confirmar o recebimento da passagem no e-mail',    
      'Finalizada parcialmente, aguardando 24h para evitar cancelamento de passagem',
      'Garantias devolvidas a ambos',
      'Dinheiro transferido ao vendedor',
      'Negociação Finalizada',
    ];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    console.log("Buscando negociação: " + id + "Status: " + status);
    // Busca a negociação pelo ID
    const negociacao = await Negociacao.findByPk(id);
    if (!negociacao) {
      return res.status(404).json({ error: 'Negociação não encontrada' });
    }
    console.log("Atualizando");
    // Atualiza o status
    negociacao.status = status;
    await negociacao.save();

    return res.status(200).json({ message: 'Status atualizado com sucesso', negociacao });

  } catch (error) {
    console.error('Erro ao atualizar status da negociação:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


module.exports = {
  buscarNegociacoes,
  adicionarNegociacao,
  buscarNegociacaoPorId,
  getNegociacoesPorUsuario,
  atualizarStatusNegociacao
};
