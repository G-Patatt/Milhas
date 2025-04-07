const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
require('dotenv').config(); // para carregar o .env

// Configura a AWS (credenciais devem estar nas variáveis de ambiente)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1", // ou a região que você escolheu no SES
});

// Cria o transporte com SES
const transport = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: "2010-12-01" }),
});

// Verifica a conexão
transport.verify(function (error, success) {
  if (error) {
    console.log("Erro ao verificar o transporte SES:", error);
  } else {
    console.log("Transport SES verificado com sucesso!");
  }
});

// Função para enviar email
const sendEmail = async (email, subject, message) => {
  try {
    const info = await transport.sendMail({
      from: '"Miles Exchange" <no-reply@milhasexchange.com>', // precisa estar verificado no SES
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
