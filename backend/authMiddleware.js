const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Recupera o token do cabeçalho

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'secret-key');  // Verifica o token
    req.usuarioId = decoded.id;  // Adiciona o ID do usuário ao `req`
    next();  // Chama o próximo middleware ou rota
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
