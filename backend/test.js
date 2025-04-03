const { Avaliacao } = require("./"); // Adjust according to your model file
const Usuario = require("./models/Usuario");
const Negociacao = require("./models/Negociacao");
const { sendEmail } = require("./mail");

async function deleteAllAvaliacoes() {
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
      message:
        "O comprador deve confirmar o recebimento da passagem no e-mail.",
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
  let status = "Garantias devolvidas a ambos";
  let id = 3;
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

  console.log(process.env.EMAIL_PASSWORD);

  if (statusPermitidos[status] === undefined) {
    return;
  }
  // Busca a negociação pelo ID
  const negociacao = await Negociacao.findByPk(id);
  if (!negociacao) {
    return;
  }

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
        console.log(usuario.email);
        await sendEmail(
          usuario.email,
          statusMessages[status].subject,
          statusMessages[status].message
        );
      }
    }
  }
}

deleteAllAvaliacoes();
