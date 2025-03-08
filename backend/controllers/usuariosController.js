// controllers/usuariosController.js

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


// Função para obter notificações do usuário
const obterNotificacoes = async (req, res) => {
  try {
    const usuarioId = req.params.id; // Obtém o ID do usuário da rota
     // Log para verificar se os dados foram recebidos corretamente
     console.log('Dados recebidos: testr');
    // Buscar o usuário pelo ID
    const usuario = await Usuario.findByPk(usuarioId);
    
    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Retorna o número de notificações (aqui estamos supondo que as notificações estão no campo 'milhas')
    return res.status(200).json({ notificacoes: usuario.notificacoes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter notificações' });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Log para verificar se os dados foram recebidos corretamente
    console.log('Dados recebidos:', { nome, email, senha });

    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar um novo usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

module.exports = {
  cadastrar,
  obterNotificacoes
};
