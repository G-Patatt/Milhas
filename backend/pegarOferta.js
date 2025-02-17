// Exemplo de rota para pegar uma oferta
// Usuário simulado
let usuario = {
    id: 1,
    nome: 'Usuário Exemplo',
    milhas: 10000,  // Milhas iniciais
  };

  
app.post('/api/pegarOferta', async (req, res) => {
    const { ofertaId } = req.body;
    const usuarioId = req.userId;  // Assumindo que você tem o usuário autenticado no contexto

    try {
        // Buscar a oferta e o usuário
        const oferta = await Oferta.findById(ofertaId);
        const usuario = await Usuario.findById(usuarioId);

        // Verificar se o usuário tem milhas suficientes
        if (usuario.milhas < oferta.preco) {
            return res.status(400).send({ message: 'Milhas insuficientes' });
        }

        // Subtrair as milhas
        usuario.milhas -= oferta.preco;
        await usuario.save();

        // Atualizar a oferta como "pegada" ou algo semelhante
        oferta.status = 'Pegada';  // Exemplo de atualização
        await oferta.save();

        res.send({ message: 'Oferta pegada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao processar a oferta' });
    }
});
