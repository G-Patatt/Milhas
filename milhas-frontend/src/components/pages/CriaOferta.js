import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarOferta() {
  const [preco, setPreco] = useState('');
  const [qtdMilhas, setQtdMilhas] = useState('');
  const [ciaAerea, setCiaAerea] = useState('');
  const [compraOuVenda, setCompraOuVenda] = useState('compra');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  // Recuperar o usuarioId do token armazenado no localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigate('/login');  // Se não houver token, redireciona para login
  }
  
  const usuarioId = localStorage.getItem('usuarioId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      setFeedback('Usuário não autenticado');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/ofertas/criarOferta', {
        preco,
        qtdMilhas,
        ciaAerea,
        compraOuVenda,
        usuarioId
      });

      setFeedback(response.data.message);
      navigate('/ofertas');  // Redirecionar para a página de ofertas após criar a oferta
    } catch (error) {
      console.error('Erro ao criar oferta:', error);
      setFeedback('Erro ao criar oferta. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Criar Nova Oferta</h1>
      {feedback && <div className="alert alert-info">{feedback}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="number"
            className="form-control"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qtdMilhas" className="form-label">Quantidade de Milhas</label>
          <input
            type="number"
            className="form-control"
            id="qtdMilhas"
            value={qtdMilhas}
            onChange={(e) => setQtdMilhas(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ciaAerea" className="form-label">Companhia Aérea</label>
          <select
            className="form-control"
            id="ciaAerea"
            value={ciaAerea}
            onChange={(e) => setCiaAerea(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="LATAM">LATAM</option>
            <option value="SMILES">SMILES</option>
            <option value="AZUL">AZUL</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="compraOuVenda" className="form-label">Tipo de Oferta</label>
          <select
            className="form-control"
            id="compraOuVenda"
            value={compraOuVenda}
            onChange={(e) => setCompraOuVenda(e.target.value)}
            required
          >
            <option value="compra">Compra</option>
            <option value="venda">Venda</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Criar Oferta</button>
      </form>
    </div>
  );
}

export default CriarOferta;
