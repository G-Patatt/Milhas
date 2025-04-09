const nodemailer = require("nodemailer");
require('dotenv').config(); // para carregar o .env

// Cria o transporte SMTP (Brevo, Mailersend ou outro)
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // ex: smtp-relay.brevo.com
  port: 587,
  secure: false, // true para porta 465
  auth: {
    user: process.env.SMTP_USER, // seu e-mail verificado na Brevo
    pass: process.env.SMTP_PASS, // senha SMTP da Brevo (ou chave da API SMTP)
  },
});

// Verifica a conexão
transport.verify(function (error, success) {
  if (error) {
    console.log("Erro ao verificar o transporte SMTP:", error);
  } else {
    console.log("Transporte SMTP verificado com sucesso!");
  }
});

// Função para enviar e-mail
const sendEmail = async (email, subject, message) => {
  try {
    

    const info = await transport.sendMail({
      from: '"MilhasExchange" <no-reply@milhasexchange.com>',
      to: email,
      subject,
      text: message,
      html: message,
    });
    return info;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
