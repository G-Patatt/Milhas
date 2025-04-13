// controllers/usuariosController.js

const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../mail.js"); // ou o caminho correto do seu mail.js
const { Op } = require("sequelize");

require('dotenv').config();


const recuperarSenha = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    // Gera token e expiração (1h)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);
    console.log("Armazenando token ");
    usuario.reset_password_token = token;
    usuario.reset_password_expires = expires;
    await usuario.save();

    console.log("Token salvo:", usuario.reset_password_token);
    
    const link = `${process.env.APP_BASE_URL}/redefinir-senha/${token}`;

    await sendEmail(
      usuario.email,
      "Redefinição de senha - MilhasExchange",
      `<p>Olá ${usuario.nome},</p>
       <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
       <a href="${link}">${link}</a>
       <p>Este link expira em 1 hora.</p>`
    );

    return res.status(200).json({ message: "E-mail de recuperação enviado." });
  } catch (error) {
    console.error("Erro ao enviar recuperação de senha:", error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await Usuario.findByPk(usuarioId, {
      attributes: ["id", "nome", "email", "qtdAvaliacoes", "avaliacao","email_verificado"], // Pegando apenas os dados necessários
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
// Função para obter notificações do usuário
const obterNotificacoes = async (req, res) => {
  try {
    const usuarioId = req.params.id; // Obtém o ID do usuário da rota
    // Log para verificar se os dados foram recebidos corretamente

    // Buscar o usuário pelo ID
    const usuario = await Usuario.findByPk(usuarioId);

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Retorna o número de notificações (aqui estamos supondo que as notificações estão no campo 'milhas')
    return res.status(200).json({ notificacoes: usuario.notificacoes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao obter notificações" });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    // Gera token de verificação
    const emailToken = crypto.randomBytes(32).toString("hex");

    // Cria usuário com token
    const usuario = await Usuario.create({
      nome,
      email,
      telefone,
      senha: senhaHash,
      email_verification_token: emailToken,
      email_verificado: false,
    });

    // Cria link de verificação
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const link = `${baseUrl}/verificar-email/${emailToken}`;;

    // Envia o e-mail
    await sendEmail(
      email,
      "Confirme seu e-mail - MilhasExchange",
      `<p>Olá ${nome},</p>
       <p>Obrigado por se cadastrar na MilhasExchange!</p>
       <p>Para ativar sua conta, clique no link abaixo:</p>
       <a href="${link}">${link}</a>
       <p>Se você não solicitou isso, apenas ignore este e-mail.</p>`
    );

    return res.status(201).json({ message: "Usuário criado! Verifique seu e-mail para ativar a conta." });

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};
const confirmarEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const usuario = await Usuario.findOne({
      where: { email_verification_token: token },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    usuario.email_verificado = true;
    usuario.email_verification_token = null;
    await usuario.save();

    return res.status(200).json({ success: true, usuarioId: usuario.id });
  } catch (error) {
    console.error("Erro ao confirmar e-mail:", error);
    return res.status(500).json({ error: "Erro ao confirmar e-mail." });
  }
};
const redefinirSenha = async (req, res) => {
  const { token, novaSenha } = req.body;
    console.log("caí aqui")
  try {
    const usuario = await Usuario.findOne({
      where: {
        reset_password_token: token,
        reset_password_expires: {
          [Op.gt]: new Date(), // token ainda não expirado
        },
      },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    // Atualiza a senha
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    usuario.senha = senhaHash;
    usuario.reset_password_token = null;
    usuario.reset_password_expires = null;

    await usuario.save();

    return res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ error: "Erro ao redefinir a senha." });
  }
};
const verificarTokenRedefinicao = async (req, res) => {
  const { token } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: {
        reset_password_token: token,
        reset_password_expires: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!usuario) {
      return res.status(200).json({ valido: false });
    }

    return res.status(200).json({ valido: true });
  } catch (error) {
    console.error("Erro ao verificar token de redefinição:", error);
    return res.status(500).json({ valido: false });
  }
};



module.exports = {
  cadastrar,
  obterNotificacoes,
  buscarUsuarioPorId,
 confirmarEmail ,
 recuperarSenha,
 redefinirSenha,
 verificarTokenRedefinicao

};
