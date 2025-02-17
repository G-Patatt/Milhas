const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); // Ajuste o caminho conforme necessário


const login = async (req, res) => {
  const { email, senha } = req.body;

  // Verifique se o email e senha foram passados corretamente
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    // Buscar o usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    console.log("Senha fornecida:", senha);
    console.log("Senha no banco:", usuario.senha);
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log("Senha válida:", senhaValida);
    
    

    // Gerar um token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secret-key', {
      expiresIn: '1h', // O token vai expirar em 1 hora
    });

    // Responder com o token e as informações do usuário
    res.json({
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao tentar fazer login' });
  }
};


module.exports = { login };
