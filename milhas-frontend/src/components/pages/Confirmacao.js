import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import axios from 'axios';

function Confirmacao() {
  const { ofertaId } = useParams();  // Pega o ID da oferta da URL
  const [oferta, setOferta] = useState(null);  // Armazena os dados da oferta
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [aceito, setAceito] = useState(false);
  const [feedback, setFeedback] = useState('');  
  const navigate = useNavigate();
  // Verifique se há um token armazenado
  const token = localStorage.getItem('token');

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  // Se não houver token, redireciona para a página de login
  if (!token) {
    navigate('/login');
  }

  // Carregar a oferta com base no ID
  useEffect(() => {
    if (!ofertaId) {
      setFeedback('ID da oferta não encontrado.');
      return;
    }

    setFeedback('Carregando dados da oferta...');
    axios.get(`http://localhost:5000/api/ofertas/${ofertaId}`)
      .then(response => {
        if (response.data) {
          setOferta(response.data);  
          setFeedback('');  
        } else {
          setFeedback('Oferta não encontrada.');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar a oferta:', error);
        setFeedback('Erro ao carregar os dados da oferta.');
      });
  }, [ofertaId]);

  // Enviar a confirmação para o backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se os campos estão preenchidos e o checkbox foi marcado
    if (!origem || !destino || !aceito) {
      alert('Preencha todos os campos e aceite os termos.');
      return;
    }

    const negociacaoData = {}; // Criando um objeto simples
    console.log(oferta);
    if (oferta.compraOuVenda === "Venda") {
      negociacaoData.usuarioIdComprador = usuario.id;
      negociacaoData.usuarioIdVendedor = oferta.usuarioId;
    } else {      
      negociacaoData.usuarioIdComprador = oferta.usuarioId;
      negociacaoData.usuarioIdVendedor = usuario.id;    
    }

    if(negociacaoData.usuarioIdComprador == negociacaoData.usuarioIdVendedor){
      setFeedback('Você não pode comprar e vender para si mesmo');  
      return;
    }

    if(negociacaoData.usuarioIdComprador == undefined || negociacaoData.usuarioIdComprador == null || negociacaoData.usuarioIdVendedor == undefined || negociacaoData.usuarioIdVendedor == null){
      setFeedback('Houve um problema com a geração da negociação, entre em contato com o suporte.');  
      return;
    }

    negociacaoData.ofertaId = ofertaId; // Atribuindo diretamente 

    console.log(negociacaoData);
     

  
      // Envia a negociação ao backend
      axios.post('http://localhost:5000/api/negociacao', negociacaoData)
        .then((response) => {
          alert('Negociação criada com sucesso!');
              // Enviar a confirmação para o backend
              axios.post('http://localhost:5000/api/ofertas/confirmarOferta', { ofertaId })
              .then(response => {
                alert(response.data.message);  // Exibe a mensagem de confirmação
            
              })
              .catch(error => {
                console.error('Erro ao confirmar a oferta:', error);
                setFeedback('Erro ao confirmar a oferta.');
              });
              navigate(`/negociacoes/${response.data.negociacao.negociacaoId}`); // Redireciona após o sucesso
        })
        .catch(() => setFeedback('Erro ao criar a negociação.'));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Confirmação da Oferta</h1>
      {feedback && <div className="alert alert-info">{feedback}</div>}

      {oferta ? (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <div className="mb-3">
            <label htmlFor="origem" className="form-label">Origem:</label>
            <input
              type="text"
              id="origem"
              className="form-control"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              placeholder="Ex: São Paulo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destino" className="form-label">Destino:</label>
            <input
              type="text"
              id="destino"
              className="form-control"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ex: Rio de Janeiro"
              required
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceito"
                checked={aceito}
                onChange={() => setAceito(!aceito)}
              />
              <label htmlFor="aceito" className="form-check-label">Aceito os termos e condições</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Confirmar Oferta</button>
        </form>
      ) : (
        <div className="alert alert-warning mt-4">Carregando a oferta...</div>
      )}
    </div>
  );
}

export default Confirmacao;
