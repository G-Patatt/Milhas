// controllers/ofertasController.js

const Oferta = require('../models/Oferta');  // Supondo que você esteja usando Sequelize

// Controlador para buscar todas as ofertas
exports.buscarOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.findAll({ where: { confirmada: false } });
    if (ofertas.length === 0) {
      return res.status(200).send([]); // Retorna um array vazio se não houver ofertas
    }
    res.json(ofertas);  // Retorna as ofertas se existirem
  } catch (error) {
    console.error('Erro ao buscar ofertas:', error);
    res.status(500).send('Erro ao buscar ofertas');
  }
};

// Controlador para pegar uma oferta
exports.pegarOferta = async (req, res) => {
  const { ofertaId } = req.body;  // Recebe o ID da oferta

  try {
    const oferta = await Oferta.findByPk(ofertaId);  // Buscar a oferta pelo ID

    if (!oferta) {
      return res.status(404).send({ message: 'Oferta não encontrada!' });
    }

    // Simulação de um usuário (substitua isso por um sistema real de usuários)
    let usuario = {
      id: 1,
      nome: 'Usuário Exemplo',
      milhas: 10000,  // Milhas iniciais do usuário
    };

    // Verificar se o usuário tem milhas suficientes
    if (usuario.milhas < oferta.preco) {
      return res.status(400).send({ message: 'Milhas insuficientes!' });
    }

    // Subtrair as milhas do usuário
    usuario.milhas -= oferta.preco;

    // Marcar a oferta como "Pegada"
    oferta.status = 'Pegada';
    await oferta.save();  // Salva a alteração
    res.send({ message: 'Oferta pegada com sucesso!' });

  } catch (error) {
    console.error('Erro ao pegar oferta:', error);
    res.status(500).send({ message: 'Erro ao pegar oferta. Tente novamente.' });
  }
};

// Função para buscar uma oferta específica pelo ID
exports.buscarOfertaEspecifica = async (req, res) => {
  const { ofertaId } = req.params;  // Pega o ID da oferta da URL

  try {
    const oferta = await Oferta.findOne({ where: { ofertaId } });  // Supondo que você esteja usando Sequelize

    if (!oferta) {
      return res.status(404).json({ message: 'Oferta não encontrada' });
    }

    res.json(oferta);  // Retorna os dados da oferta encontrada
  } catch (error) {
    console.error('Erro ao buscar a oferta:', error);
    res.status(500).json({ message: 'Erro ao buscar a oferta' });
  }
};

// Função para confirmar uma oferta
exports.confirmarOferta = async (req, res) => {
  const { ofertaId } = req.body;  // Recebe o ID da oferta para confirmar

  try {
    // Atualiza a oferta como "confirmada"
    const oferta = await Oferta.update({ confirmada: true }, { where: { ofertaId } });

    if (oferta[0] === 0) {
      return res.status(404).json({ message: 'Oferta não encontrada.' });
    }

    res.send({ message: 'Oferta confirmada com sucesso!' });

  } catch (error) {
    console.error('Erro ao confirmar oferta:', error);
    res.status(500).send({ message: 'Erro ao confirmar oferta. Tente novamente.' });
  }
};
// controllers/ofertasController.js

// Controlador para criar uma nova oferta
exports.criarOferta = async (req, res) => {
  const { preco, qtdMilhas, milhasId, usuarioId, ciaAerea, compraOuVenda } = req.body;

  try {
    // Criação de uma nova oferta
    const novaOferta = await Oferta.create({
      preco,
      qtdMilhas,
      milhasId,
      usuarioId,
      ciaAerea,
      compraOuVenda,
      confirmada: false  // Ao criar, a oferta não está confirmada
    });

    // Resposta de sucesso com a oferta criada
    res.status(201).json({
      message: 'Oferta criada com sucesso!',
      oferta: novaOferta
    });
  } catch (error) {
    console.error('Erro ao criar oferta:', error);
    res.status(500).json({ message: 'Erro ao criar oferta. Tente novamente.' });
  }
};