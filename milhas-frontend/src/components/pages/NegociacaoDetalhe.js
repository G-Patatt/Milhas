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

    const [paymentLink, setPaymentLink] = useState('');
      console.log(JSON.stringify({
        title: 'Produto Exemplo', // aqui sera a oferta
        quantity: 1, //quantity acredito que 1
        price: 100.00 //preco da oferta
      }));
      
      const criarPreference = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/mercadopago/preference', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: 'Produto Exemplo',
              quantity: 1,
              price: 100.00
            })
          });
    
          const data = await response.json();
        
          setPaymentLink(data.url); // Guarda o link retornado pelo Mercado Pago
    
          // Redireciona automaticamente o usuário
          window.location.href = data.url;
        } catch (error) {
          console.error('Erro ao criar a preference:', error);
        }
      };
    

  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4">Ofertas de Milhas</h1>
    
    {feedback && <p className="text-danger">{feedback}</p>}
  
    {negociacao && (
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          {/* Aqui ficam as informações da negociação */}
          <div>
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
          
          </div>
  
     
          <button className="btn btn-primary" onClick={criarPreference}>Alocar Garantias</button>
        </div>
      </div>
    )}
  </div>
  

  );
}

export default DetalhesNegociacao;
