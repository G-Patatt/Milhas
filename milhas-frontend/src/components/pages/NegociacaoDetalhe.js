import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';  // Importar useLocation
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function DetalhesNegociacao() {
  const { id } = useParams();  // Acessando o id da URL
  const location = useLocation();  // Obter o objeto de localização atual
  const [negociacao, setNegociacao] = useState(null);
  const [garantia, setGarantia] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Usar URLSearchParams para acessar o valor de ofertaId
  const queryParams = new URLSearchParams(location.search);
  const ofertaId = queryParams.get('ofertaId');

  useEffect(() => {
    setFeedback('Carregando detalhes da negociação...');

    // Fazendo a requisição para obter a negociação com a garantia
    axios
      .get(`http://localhost:5000/api/negociacao/${id}?ofertaId=${ofertaId}`) // Passando ofertaId na query string
      .then((response) => {
        setNegociacao(response.data.negociacao);
        setGarantia(response.data.garantia); // Armazenando a garantia
        setFeedback('');
      })
      .catch((error) => {
        setFeedback('Erro ao carregar os detalhes da negociação.');
        console.error(error);
      });
  }, [id, ofertaId]);

  return (
    <div className="container mt-4">
      <h1>Detalhes da Negociação</h1>
      {feedback && <p className="text-danger">{feedback}</p>}
      {negociacao && (
        <div className="card p-4">
          <p>
            <strong>ID da Negociação:</strong> {negociacao.negociacaoId}
          </p>
          <p>
            <strong>ID do Comprador:</strong> {negociacao.usuarioIdComprador}
          </p>
          <p>
            <strong>ID do Vendedor:</strong> {negociacao.usuarioIdVendedor}
          </p>
          <p>
            <strong>ID da Oferta:</strong> {negociacao.ofertaId}
          </p>
          <p>
            <strong>Valor da Garantia:</strong>{' '}
            {garantia ? garantia.valor : 'Sem garantia'}
          </p>
        </div>
      )}
    </div>
  );
}

export default DetalhesNegociacao;
