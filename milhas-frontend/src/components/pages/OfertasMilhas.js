"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/OfertasMilhas.css"; // Importando o arquivo CSS personalizado
import AvaliationContainer from "../avaliationContainer";
const API = process.env.REACT_APP_API_BASE;

function OfertasMilhas() {
  const [ofertas, setOfertas] = useState([]);
  const [ofertasFiltradas, setOfertasFiltradas] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [companhias, setCompanhias] = useState([]);
  const navigate = useNavigate();

  // Estados para os filtros
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCompanhia, setFiltroCompanhia] = useState("todas");

  useEffect(() => {
    // Buscar ofertas
    setLoading(true);
    console.log("Deploy")
    axios
      .get(`${API}/api/ofertas`)
      .then((response) => {
        if (response.data.length === 0) {
          setFeedback("Nenhuma oferta disponível no momento.");
        } else {
          setFeedback(""); // Limpa a mensagem de feedback se ofertas forem encontradas

          // Extrair companhias únicas para o filtro
          const companhiasUnicas = [
            ...new Set(response.data.map((oferta) => oferta.ciaAerea)),
          ].sort();
          setCompanhias(companhiasUnicas);
        }
        setOfertas(response.data);
        setOfertasFiltradas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar ofertas:", error);
        setFeedback("Erro ao carregar ofertas. Tente novamente mais tarde.");
        setLoading(false);
      });
  }, []);

  // Aplicar filtros quando eles mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [filtroTipo, filtroCompanhia, ofertas]);

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    let resultado = [...ofertas];

    // Filtrar por tipo (compra ou venda)
    if (filtroTipo !== "todos") {
      resultado = resultado.filter(
        (oferta) =>
          oferta.compraOuVenda.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    // Filtrar por companhia aérea
    if (filtroCompanhia !== "todas") {
      resultado = resultado.filter(
        (oferta) => oferta.ciaAerea === filtroCompanhia
      );
    }

    setOfertasFiltradas(resultado);
  };

  // Limpar todos os filtros
  const limparFiltros = () => {
    setFiltroTipo("todos");
    setFiltroCompanhia("todas");
    setOfertasFiltradas(ofertas);
  };

  const confirmaOferta = async (ofertaId) => {
    try {
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

  // Função para determinar a classe de badge baseada no tipo de oferta
  const getBadgeClass = (tipo) => {
    return tipo.toLowerCase() === "compra" ? "badge-compra" : "badge-venda";
  };

  // Função para formatar o preço
  const formatarPreco = (preco) => {
    return Number.parseFloat(preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para formatar a quantidade de milhas
  const formatarMilhas = (milhas) => {
    return Number.parseInt(milhas).toLocaleString("pt-BR");
  };

  return (
    <div className="ofertas-container">
      <div className="ofertas-header">
        <h1>Ofertas de Milhas</h1>
        <p className="ofertas-subtitle">
          Encontre as melhores oportunidades para comprar ou vender suas milhas
        </p>

        <button className="btn-criar-oferta" onClick={criarNovaOferta}>
          <i className="fa fa-plus-circle icon-margin-right"></i>
          Publicar nova oferta
        </button>
      </div>

      {/* Seção de filtros */}
      <div className="filtros-container">
        <div className="filtros-header">
          <h2>Filtros</h2>
          {(filtroTipo !== "todos" || filtroCompanhia !== "todas") && (
            <button className="btn-limpar-filtros" onClick={limparFiltros}>
              <i className="fa fa-times-circle icon-margin-right"></i>
              Limpar filtros
            </button>
          )}
        </div>

        <div className="filtros-grid">
          {/* Filtro por tipo de oferta */}
          <div className="filtro-grupo">
            <label className="filtro-label">Tipo de oferta</label>
            <div className="filtro-opcoes">
              <label
                className={`filtro-opcao ${
                  filtroTipo === "todos" ? "ativo" : ""
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value="todos"
                  checked={filtroTipo === "todos"}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                />
                <span>Todos</span>
              </label>
              <label
                className={`filtro-opcao ${
                  filtroTipo === "compra" ? "ativo" : ""
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value="compra"
                  checked={filtroTipo === "compra"}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                />
                <span>Compra</span>
              </label>
              <label
                className={`filtro-opcao ${
                  filtroTipo === "venda" ? "ativo" : ""
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value="venda"
                  checked={filtroTipo === "venda"}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                />
                <span>Venda</span>
              </label>
            </div>
          </div>

          {/* Filtro por companhia aérea */}
          <div className="filtro-grupo">
            <label htmlFor="companhia" className="filtro-label">
              Companhia aérea
            </label>
            <select
              id="companhia"
              className="filtro-select"
              value={filtroCompanhia}
              onChange={(e) => setFiltroCompanhia(e.target.value)}
            >
              <option value="todas">Todas as companhias</option>
              {companhias.map((companhia, index) => (
                <option key={index} value={companhia}>
                  {companhia}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resultados da filtragem */}
      <div className="resultados-info">
        {!loading && (
          <p>
            {ofertasFiltradas.length}{" "}
            {ofertasFiltradas.length === 1
              ? "oferta encontrada"
              : "ofertas encontradas"}
            {(filtroTipo !== "todos" || filtroCompanhia !== "todas") &&
              " com os filtros aplicados"}
          </p>
        )}
      </div>

      {/* Mostrar a mensagem de feedback (erro ou ausência de ofertas) */}
      {feedback && <div className="ofertas-feedback">{feedback}</div>}

      {/* Mostrar indicador de carregamento */}
      {loading ? (
        <div className="ofertas-loading">
          <div className="spinner"></div>
          <p>Carregando ofertas...</p>
        </div>
      ) : /* Renderizar as ofertas somente se existirem */
      ofertasFiltradas.length > 0 ? (
        <div className="ofertas-grid">
          {ofertasFiltradas.map((oferta) => (
            <div key={oferta.ofertaId} className="oferta-card">
              <div className="oferta-card-header">
                <section className="user-avaliation">
                  <span className="">
                    <i className="fa fa-user icon-margin-right"></i>
                    {oferta.usuario.nome}
                  </span>
                  <span>
                    <AvaliationContainer
                      rating={oferta.usuario.avaliacao}
                      ratingAmount={oferta.usuario.qtdAvaliacoes}
                    />
                  </span>
                </section>
                <span
                  className={`oferta-badge ${getBadgeClass(
                    oferta.compraOuVenda
                  )}`}
                >
                  <i className="fa fa-exchange-alt icon-margin-right"></i>
                  {oferta.compraOuVenda}
                </span>

                <h3 className="oferta-titulo">{oferta.oferta}</h3>
              </div>

              <div className="oferta-card-body">
                <div className="oferta-info">
                  <div className="oferta-info-item">
                    <i className="fa fa-money-bill-wave oferta-icon"></i>
                    <div>
                      <span className="oferta-label">Preço</span>
                      <span className="oferta-valor">
                        {formatarPreco(oferta.preco)}
                      </span>
                    </div>
                  </div>

                  <div className="oferta-info-item">
                    <i className="fa fa-plane oferta-icon"></i>
                    <div>
                      <span className="oferta-label">Companhia</span>
                      <span className="oferta-valor">{oferta.ciaAerea}</span>
                    </div>
                  </div>

                  <div className="oferta-info-item oferta-milhas">
                    <div className="milhas-icon">
                      <span>M</span>
                    </div>
                    <div>
                      <span className="oferta-label">Quantidade</span>
                      <span className="oferta-valor">
                        {formatarMilhas(oferta.qtdMilhas)} milhas
                      </span>
                    </div>
                  </div>
                </div>

                <div className="oferta-preco-unitario">
                  <span className="oferta-label">Preço por 1.000 milhas</span>
                  <span className="oferta-valor-destaque">
                    {formatarPreco((oferta.preco / oferta.qtdMilhas) * 1000)}
                  </span>
                </div>
              </div>

              <div className="oferta-card-footer">
                <button
                  className="btn-pegar-oferta"
                  onClick={() => confirmaOferta(oferta.ofertaId)}
                >
                  Pegar Oferta
                  <i className="fa fa-arrow-right icon-margin-left"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sem-resultados">
          <i className="fa fa-search fa-3x"></i>
          <p>Nenhuma oferta encontrada com os filtros selecionados.</p>
          <button className="btn-limpar-filtros" onClick={limparFiltros}>
            Limpar filtros e mostrar todas as ofertas
          </button>
        </div>
      )}
    </div>
  );
}

export default OfertasMilhas;
