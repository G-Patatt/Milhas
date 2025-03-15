import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';  // Importar useLocation
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const buscarOfertaPorId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/ofertas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar oferta:", error);
    return null;
  }
};

const buscarNegociacaoPorId = async (id,ofertaId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/negociacao/${id}?ofertaId=${ofertaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar oferta:", error);
    return null;
  }
};


const buscarUsuariosPorId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar oferta:", error);
    return null;
  }
};

const atualizarStatusNegociacao = async (negociacaoId, novoStatus) => {
  try {
  
    const response = await axios.put(`http://localhost:5000/api/negociacao/${negociacaoId}/status`, {
      status: novoStatus
    });
 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar negociacao:", error);
    return null;
  }
};


function DetalhesNegociacao() {
  const { id } = useParams();  // Acessando o id da URL
  const location = useLocation();  // Obter o objeto de localização atual
  const [negociacao, setNegociacao] = useState([]);
  const [usuarioVendedor, setUsuariosVendedorInfo] = useState([]);
  const [usuarioComprador, setUsuariosCompradorInfo] = useState([]);
  const [feedback] = useState('');
  const [oferta, setOferta] = useState([]);
  

  // Usar URLSearchParams para acessar o valor de ofertaId
  const queryParams = new URLSearchParams(location.search);
  const ofertaId = queryParams.get('ofertaId');

  useEffect(() => {
    async function carregarOferta() {
      const dados = await buscarOfertaPorId(ofertaId);
      setOferta(dados);
    }
    carregarOferta();
    // Fazendo a requisição para obter a negociação com a garantia

    async function carregarNegociacao() {
      const dados = await buscarNegociacaoPorId(id,ofertaId);
 
      const comprador = await buscarUsuariosPorId(dados.negociacao.usuarioIdComprador);
      console.log("Comprador " + comprador.email);      
      
      const vendedor = await buscarUsuariosPorId(dados.negociacao.usuarioIdVendedor);
      console.log("Vendedor " + vendedor.email);

      setUsuariosCompradorInfo(comprador);
      setUsuariosVendedorInfo(vendedor);
      setNegociacao(dados.negociacao);

      
   
  
    }
    carregarNegociacao();
   
  }, [id, ofertaId]);

 

      
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
          console.log(data);
          atualizarStatusNegociacao(negociacao.negociacaoId,'Comprador gerou o link mas ainda não pagou');
       
          
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
            <strong>Email do Comprador:</strong> {usuarioComprador.email}
          </p>
          <p>
            <strong>Email do Vendedor:</strong> {usuarioVendedor.email}
          </p>

          <p>
            <strong>Status:</strong> {negociacao.status}
          </p>
   
          </div>

          {oferta ? (
                <div className="card p-3">
                    <h3 className="text-center">Dados da oferta</h3>
                    <p><strong>Quantidade de milhas:</strong> {oferta.qtdMilhas}</p>
                    <p><strong>Preço:</strong> R$ {oferta.preco}</p>
                    <p><strong>Cia Aérea :</strong> {oferta.ciaAerea}</p>
                    <p><strong>Oferta confirmada? </strong> {(oferta.confirmada) ? "Confirmada": "Não confirmada"}</p>
                    <p><strong>Tipo: </strong> {oferta.compraOuVenda}</p>
                </div>
            ) : (
                <p className="text-warning">Nenhuma oferta encontrada.</p>
            )}
  
     
          <button className="btn btn-primary" onClick={criarPreference}>Alocar Garantias</button>
        </div>
      </div>
    )}
  </div>
  

  );
}

export default DetalhesNegociacao;
