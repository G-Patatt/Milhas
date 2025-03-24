import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Confirmacao() {
  const { ofertaId } = useParams();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState(null);
  const [usuarioComprador, setUsuarioComprador] = useState(null);
  const [usuarioVendedor, setUsuarioVendedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usuarioId = JSON.parse(localStorage.getItem("usuario")).id;

  useEffect(() => {
    const buscarOferta = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/ofertas/${ofertaId}`
        );
        setOferta(response.data);

        const comprador = await buscarUsuariosPorId(
          response.data.compraOuVenda === "compra"
            ? response.data.usuarioId
            : usuarioId
        );

        const vendedor = await buscarUsuariosPorId(
          response.data.compraOuVenda === "venda"
            ? response.data.usuarioId
            : usuarioId
        );

        setUsuarioComprador(comprador);
        setUsuarioVendedor(vendedor);
      } catch (err) {
        setError("Erro ao carregar a oferta.");
      } finally {
        setLoading(false);
      }
    };
    buscarOferta();
  }, [ofertaId]);

  const buscarUsuariosPorId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5003/api/usuarios/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar oferta:", error);
      return null;
    }
  };

  const confirmarOferta = async () => {
    if (usuarioComprador.id === usuarioVendedor.id) {
      setError("Você não pode comprar/vender para si mesmo.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5003/api/ofertas/confirmarOferta",
        { ofertaId, usuarioId }
      );
      if (response.data && response.data.negociacaoId) {
        navigate(`/negociacoes/${response.data.negociacaoId}`);
      } else {
        setError("Erro ao confirmar a oferta. Negociação não encontrada.");
      }
    } catch (err) {
      setError("Erro ao confirmar a oferta.");
    }
  };

  const recusarOferta = () => {
    navigate("/ofertas");
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container mt-4">
      <h2>Confirmação da Oferta</h2>

      {/* Exibe a mensagem de erro acima da oferta */}
      {error && <p className="text-danger fw-bold">{error}</p>}

      {oferta ? (
        <div className="card p-4">
          <p>
            <strong>Usuário Vendedor:</strong> {usuarioVendedor?.nome}
          </p>
          <p>
            <strong>Usuário Comprador:</strong> {usuarioComprador?.nome}
          </p>
          <p>
            <strong>Valor:</strong> R$ {oferta.preco}
          </p>
          <p>
            <strong>Quantidade de Milhas:</strong> {oferta.qtdMilhas}
          </p>
          <div className="mt-3">
            <button
              className="btn btn-success me-2"
              onClick={confirmarOferta}
              disabled={!!error}
            >
              Confirmar
            </button>
            <button className="btn btn-danger" onClick={recusarOferta}>
              Recusar
            </button>
          </div>
        </div>
      ) : (
        <p>Nenhuma oferta encontrada.</p>
      )}
    </div>
  );
}

export default Confirmacao;
