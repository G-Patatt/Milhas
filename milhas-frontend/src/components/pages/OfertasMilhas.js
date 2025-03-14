import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function OfertasMilhas() {
  const [ofertas, setOfertas] = useState([]);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar ofertas (com ou sem filtro)
    axios
      .get("http://localhost:5001/api/ofertas")
      .then((response) => {
        if (response.data.length === 0) {
          setFeedback("Nenhuma oferta disponível no momento.");
        } else {
          setFeedback(""); // Limpa a mensagem de feedback se ofertas forem encontradas
        }
        setOfertas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar ofertas:", error);
        setFeedback("Erro ao carregar ofertas. Tente novamente mais tarde.");
      });
  }, []);

  const pegarOferta = async (ofertaId) => {
    try {
      console.log(ofertaId);
      const response = await axios.post(
        "http://localhost:5001/api/ofertas/pegarOferta",
        { ofertaId }
      );
      setFeedback(response.data.message); // Mensagem de sucesso ou erro

      // Atualizar a lista de ofertas removendo a oferta confirmada
      setOfertas(ofertas.filter((oferta) => oferta.ofertaId !== ofertaId)); // Filtrando corretamente

      // Redireciona para a página de confirmação
      navigate(`/confirmacao/${ofertaId}`);
    } catch (error) {
      setFeedback("Erro ao pegar a oferta. Tente novamente!");
      console.error("Erro:", error);
    }
  };

  // Função para redirecionar para o formulário de criação de ofertas
  const criarNovaOferta = () => {
    navigate("/criar-oferta");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ofertas de Milhas</h1>

      {/* Botão para criar nova oferta */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={criarNovaOferta}>
          Criar Nova Oferta
        </button>
      </div>
      {/* Mostrar a mensagem de feedback (erro ou ausência de ofertas) */}
      {feedback && <div className="alert alert-info">{feedback}</div>}

      {/* Renderizar as ofertas somente se existirem */}
      {ofertas.length > 0 ? (
        <ul className="list-group">
          {ofertas.map((oferta) => (
            <li
              key={oferta.ofertaId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{oferta.oferta}</h5>
                <p>R${oferta.preco}</p>
                <p>Milhas: {oferta.qtdMilhas}</p>
                <p>CIA: {oferta.ciaAerea}</p>
                <p>Tipo: {oferta.compraOuVenda}</p>
              </div>

              {/* Botão para pegar a oferta */}
              <button
                className="btn btn-primary"
                onClick={() => pegarOferta(oferta.ofertaId)}
              >
                Pegar Oferta
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default OfertasMilhas;
