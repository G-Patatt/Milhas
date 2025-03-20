import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NegociacoesUsuario() {
  const [negociacoes, setNegociacoes] = useState([]);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  // Verifique se há um token armazenado
  const token = localStorage.getItem('token');



  // Se não houver token, redireciona para a página de login
  if (!token) {
    navigate('/login');
  }

  // Carregar as negociações do usuário
  useEffect(() => {
    setFeedback('Carregando negociações...');
    axios.get('http://localhost:5000/api/negociacao/usuario', {
      headers: { Authorization: `Bearer ${token}` }  // Envia o token com a requisição
    })
      .then(response => {
       
        if(response.status === 200){
          setNegociacoes(response.data);
          setFeedback('');
          return;
        }
  
        setFeedback('Nenhuma negociação encontrada');
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Se o erro for 401, token expirou ou não autorizado
          setFeedback('Sessão expirada. Redirecionando para login...');
          localStorage.removeItem('token'); // Remove o token expirado
          navigate('/login'); // Redireciona para a página de login
        } else {
          setFeedback('Erro ao carregar as negociações.');
          console.error(error);
        }
      });
  }, [token, navigate]);

  // Navegar para os detalhes de uma negociação, passando o negociacaoId e ofertaId
  const handleNavigate = (negociacaoId, ofertaId) => {
    navigate(`/negociacoes/${negociacaoId}?ofertaId=${ofertaId}`); // Incluindo o ofertaId na URL
  };

  return (
    <div className="container mt-4">
      <h1>Minhas Negociações</h1>
      {feedback && <p className="text-danger">{feedback}</p>}
      {!feedback && negociacoes.length === 0 && <p>Nenhuma negociação encontrada.</p>}
      <ul className="list-group">
        {negociacoes.map((negociacao) => (
          <li 
            key={negociacao.negociacaoId} 
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
            <strong>ID da Negociação:</strong> {negociacao.negociacao.negociacaoId} <br />
            <strong>Comprador:</strong> {negociacao.negociacao.usuarioIdComprador} <br />
            <strong>Vendedor:</strong> {negociacao.negociacao.usuarioIdVendedor} <br />
            <strong>ID da Oferta:</strong> {negociacao.negociacao.ofertaId} <br />
            <strong>Preço:</strong> {negociacao.oferta.preco} <br />
            <strong>Quantidade de Milhas:</strong> {negociacao.oferta.qtdMilhas} <br />
            <strong>Milhas ID:</strong> {negociacao.oferta.milhasId} <br />
            <strong>Usuário ID:</strong> {negociacao.oferta.usuarioId} <br />
            <strong>Cia Aérea:</strong> {negociacao.oferta.ciaAerea} <br />
            <strong>Compra ou Venda:</strong> {negociacao.oferta.compraOuVenda} <br />
            <strong>Confirmada:</strong> {negociacao.oferta.confirmada ? 'Sim' : 'Não'} <br />
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => handleNavigate(negociacao.negociacao.negociacaoId, negociacao.oferta.ofertaId)} // Passando o ofertaId
            >
              Ver Detalhes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NegociacoesUsuario;
