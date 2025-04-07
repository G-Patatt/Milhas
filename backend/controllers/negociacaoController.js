// controllers/negociacaoController.js
const Negociacao = require("../models/Negociacao"); // Importa o modelo de negociação
const Garantia = require("../models/Garantia"); // Importando o modelo Garantia
const Oferta = require("../models/Oferta");
const { Op } = require("sequelize"); // Importar Op do Sequelize
const { sendEmail } = require("../mail");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

const statusMessages = {
  "Aguardando garantias por parte comprador": {
    subject: "Aguardando Garantias do Comprador",
    message:
      "Por favor, aloque as garantias necessárias para continuar a negociação.",
  },
  "Aguardando garantias por parte vendedor": {
    subject: "Aguardando Garantias do Vendedor",
    message:
      "O comprador já alocou as garantias. Agora é sua vez de alocar as garantias.",
  },
  "Comprador Notificado": {
    subject: "Notificação de Negociação",
    message:
      "Olá, você foi notificado sobre a negociação. Verifique seu painel.",
  },
  "Vendedor Notificado": {
    subject: "Notificação de Negociação",
    message:
      "Olá, você foi notificado sobre a negociação. Verifique seu painel.",
  },
  "Verificando Interesse Vendedor": {
    subject: "Verificação de Interesse",
    message:
      "O comprador demonstrou interesse. Confirme se deseja prosseguir com a negociação.",
  },
  "Comprador Alocou Garantias, aguardando vendedor alocar garantias": {
    subject: "Garantias Alocadas pelo Comprador",
    message:
      "O comprador já alocou as garantias. Agora é sua vez de alocar as garantias.",
  },
  "Comprador gerou o link mas ainda não pagou": {
    subject: "Pagamento Pendente do Comprador",
    message:
      "O comprador gerou o link de pagamento, mas ainda não efetuou o pagamento.",
  },
  "Vendedor gerou o link mas ainda não pagou": {
    subject: "Pagamento Pendente do Vendedor",
    message:
      "O vendedor gerou o link de pagamento, mas ainda não efetuou o pagamento.",
  },
  "Vendedor Alocou Garantias": {
    subject: "Garantias Alocadas pelo Vendedor",
    message: "O vendedor alocou as garantias. A negociação pode prosseguir.",
  },
  "Aguardando comprovante de passagem e código da reserva pelo vendedor": {
    subject: "Aguardando Comprovante de Passagem",
    message:
      "O vendedor precisa fornecer o comprovante da passagem e o código da reserva.",
  },
  "Esperando comprador confirmar o recebimento da passagem no e-mail": {
    subject: "Confirmação de Recebimento da Passagem",
    message: "O comprador deve confirmar o recebimento da passagem no e-mail.",
  },
  "Finalizada parcialmente, aguardando 24h para evitar cancelamento de passagem":
    {
      subject: "Negociação Parcialmente Finalizada",
      message:
        "A negociação foi finalizada parcialmente. Aguarde 24h para evitar o cancelamento da passagem.",
    },
  "Garantias devolvidas a ambos": {
    subject: "Garantias Devolvidas",
    message: "As garantias foram devolvidas para ambas as partes.",
  },
  "Dinheiro transferido ao vendedor": {
    subject: "Confirmação de Transferência",
    message:
      "O valor da negociação foi transferido para sua conta com sucesso.",
  },
  "Negociação Finalizada": {
    subject: "Negociação Concluída",
    message:
      "A negociação foi finalizada com sucesso. Obrigado por utilizar nossa plataforma!",
  },
};

// Função para buscar todas as negociações
const buscarNegociacoes = async (req, res) => {
  try {
    const negociacoes = await Negociacao.findAll(); // Recupera todas as negociações
    res.json(negociacoes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar negociações", details: error.message });
  }
};

// Função para adicionar uma negociação
const adicionarNegociacao = async (req, res) => {
  const { usuarioIdComprador, usuarioIdVendedor, ofertaId, status } = req.body;

  try {
    // Adiciona a nova negociação no banco
    const novaNegociacao = await Negociacao.create({
      usuarioIdComprador, // ID do comprador
      usuarioIdVendedor, // ID do vendedor
      ofertaId, // ID da oferta associada à negociação
      status,
    });

    // Resposta de sucesso
    return novaNegociacao;
  } catch (error) {
    // Caso ocorra um erro
    res
      .status(500)
      .json({ error: "Erro ao adicionar negociação", details: error.message });
  }
};

// Função para buscar uma negociação pelo ID, incluindo a garantia associada
const buscarNegociacaoPorId = async (req, res) => {
  const { id } = req.params;
  const { ofertaId } = req.query; // Agora, capturando o ofertaId da query string

  try {
    // Busca a negociação
    const negociacao = await Negociacao.findByPk(id);

    if (!negociacao) {
      return res.status(404).json({ error: "Negociação não encontrada." });
    }
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const tokenDecoded = jwt.verify(bearerToken, "secret-key");

    const isNegotiationParticipant =
      negociacao.usuarioIdComprador === tokenDecoded.id ||
      negociacao.usuarioIdVendedor === tokenDecoded.id;

    if (!isNegotiationParticipant) {
      return res
        .status(401)
        .json({ error: "Usuário não participa da negociação" });
    }

    // Agora, chamamos a função que obtém a garantia relacionada à negociação e oferta
    const garantia = await Garantia.findOne({
      where: {
        negociacaoId: id,
        ofertaId: ofertaId, // Verificando também o ofertaId
      },
    });

    // Incluímos a garantia no objeto de resposta
    const resultado = { negociacao, garantia };

    res.json(resultado); // Retorna a negociação com a garantia associada, se existir
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar negociação.", details: error.message });
  }
};
// Função para buscar negociações do usuário autenticado
const getNegociacoesPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Buscar todas as negociações do usuário
    const negociacoes = await Negociacao.findAll({
      where: {
        [Op.or]: [
          { usuarioIdComprador: usuarioId },
          { usuarioIdVendedor: usuarioId },
        ],
      },
    });

    if (negociacoes.length === 0) {
      return res
        .status(208)
        .json({ message: "Nenhuma negociação encontrada para este usuário." });
    }

    // Buscar as ofertas correspondentes
    const ofertas = await Promise.all(
      negociacoes.map(async (negociacao) => {
        const oferta = await Oferta.findOne({
          where: { ofertaId: negociacao.ofertaId },
        }); // Atualizado aqui
        return { negociacao, oferta };
      })
    );

    return res.status(200).json(ofertas);
  } catch (err) {
    console.error("Erro ao buscar negociações:", err.message);
    return res
      .status(500)
      .json({ message: "Erro ao buscar negociações", error: err.message });
  }
};

const atualizarStatusNegociacao = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID da negociação pela URL
    const { status } = req.body; // Obtém o novo status do corpo da requisição
    console.log("Cheguei no back, id: " + id + "Status: " + status);
    // Verifica se o status enviado é um dos valores permitidos no ENUM
    const statusPermitidos = {
      "Aguardando garantias por parte comprador": 1,
      "Aguardando garantias por parte vendedor": 2,
      "Comprador Notificado": 0,
      "Vendedor Notificado": 0,
      "Verificando Interesse Vendedor": 0,
      "Comprador Alocou Garantias, aguardando vendedor alocar garantias": 1,
      "Comprador gerou o link mas ainda não pagou": 1,
      "Vendedor gerou o link mas ainda não pagou": 2,
      "Vendedor Alocou Garantias": 2,
      "Aguardando comprovante de passagem e código da reserva pelo vendedor": 2,
      "Esperando comprador confirmar o recebimento da passagem no e-mail": 1,
      "Finalizada parcialmente, aguardando 24h para evitar cancelamento de passagem": 3,
      "Garantias devolvidas a ambos": 3,
      "Dinheiro transferido ao vendedor": 2,
      "Negociação Finalizada": 3,
    };

    if (statusPermitidos[status] === undefined) {
      return res.status(400).json({ error: "Status inválido" });
    }
    console.log("Buscando negociação: " + id + "Status: " + status);
    // Busca a negociação pelo ID
    const negociacao = await Negociacao.findByPk(id);
    if (!negociacao) {
      return res.status(404).json({ error: "Negociação não encontrada" });
    }
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const tokenDecoded = jwt.verify(bearerToken, "secret-key");

    const isNegotiationParticipant =
      negociacao.usuarioIdComprador === tokenDecoded.id ||
      negociacao.usuarioIdVendedor === tokenDecoded.id;

    if (!isNegotiationParticipant) {
      return res
        .status(401)
        .json({ error: "Usuário não participa da negociação" });
    }

    const url = `http://localhost:5001/negociacoes/${negociacao.negociacaoId}?ofertaId=${negociacao.ofertaId}`;

    if (statusMessages[status]) {
      let destinatarios = [];

      if (statusPermitidos[status] === 0) {
        destinatarios = [];
      } else if (statusPermitidos[status] === 1) {
        destinatarios = [negociacao.usuarioIdComprador];
      } else if (statusPermitidos[status] === 2) {
        destinatarios = [negociacao.usuarioIdVendedor];
      } else if (statusPermitidos[status] === 3) {
        destinatarios = [
          negociacao.usuarioIdComprador,
          negociacao.usuarioIdVendedor,
        ];
      }

      const usuarios = await Usuario.findAll({
        where: { id: destinatarios },
      });

      for (const usuario of usuarios) {
        if (usuario.email) {
          await sendEmail(
            usuario.email,
            statusMessages[status].subject,
            statusMessages[status].message + " - " + url
          );
        }
      }
    }

    console.log("Atualizando");
    // Atualiza o status
    negociacao.status = status;
    await negociacao.save();

    return res
      .status(200)
      .json({ message: "Status atualizado com sucesso", negociacao });
  } catch (error) {
    console.error("Erro ao atualizar status da negociação:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  buscarNegociacoes,
  adicionarNegociacao,
  buscarNegociacaoPorId,
  getNegociacoesPorUsuario,
  atualizarStatusNegociacao,
};
