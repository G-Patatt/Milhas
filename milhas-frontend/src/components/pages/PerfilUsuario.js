"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/PerfilUsuario.css";
const API = process.env.REACT_APP_API_BASE;


const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("perfil");
  const [negociacoes, setNegociacoes] = useState([]);
  const [loadingNegociacoes, setLoadingNegociacoes] = useState(false);
  const [feedbackNegociacoes, setFeedbackNegociacoes] = useState("");

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todas");

  useEffect(() => {
    // Busca de dados do usuário
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario") || "null");

    if (usuarioLocal && usuarioLocal.id === Number.parseInt(id)) {
      setUsuario(usuarioLocal);
      setLoading(false);
    } else {
      // Em um cenário real, você faria uma chamada à API aqui
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      axios
        .get(`${API}/api/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setUsuario(response.data);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  // Carregar negociações quando a aba for selecionada
  useEffect(() => {
    if (activeTab === "negociacoes" && usuario) {
      carregarNegociacoes();
    }
  }, [activeTab, usuario]);

  // Função para carregar as negociações do usuário
  const carregarNegociacoes = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingNegociacoes(true);
    setFeedbackNegociacoes("");

    axios
      .get(`${API}/api/negociacao/usuario`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setNegociacoes(response.data);
        } else {
          setFeedbackNegociacoes("Nenhuma negociação encontrada");
        }
      })
      .catch((error) => {
        setFeedbackNegociacoes("Erro ao carregar as negociações.");
        console.error(error);
      })
      .finally(() => {
        setLoadingNegociacoes(false);
      });
  };

  // Função para filtrar negociações
  const negociacoesFiltradas = () => {
    return negociacoes.filter((negociacao) => {
      // Filtro por status
      if (filtroStatus !== "todas") {
        const statusNegociacao = negociacao.oferta.confirmada
          ? "confirmadas"
          : "pendentes";
        if (filtroStatus !== statusNegociacao) return false;
      }

      // Filtro por tipo (comprador/vendedor)
      if (filtroTipo !== "todas") {
        const tipoNegociacao =
          negociacao.negociacao.usuarioIdComprador === usuario.id
            ? "comprador"
            : "vendedor";
        if (filtroTipo !== tipoNegociacao) return false;
      }

      return true;
    });
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

  if (loading) {
    return (
      <div className="perfil-container">
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin"></i>
          <span>Carregando perfil...</span>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="error-message">
          <i className="fa fa-exclamation-triangle"></i>
          <span>Usuário não encontrado</span>
        </div>
      </div>
    );
  }

  const negociacoesExibidas = negociacoesFiltradas();

  return (
    <div className="perfil-container">
      <div className="perfil-sidebar">
        <div className="perfil-user-info">
          <div className="perfil-avatar">
            <i className="fa fa-user-circle-o"></i>
          </div>
          <h3>{usuario.nome}</h3>
          <p>{usuario.email}</p>
        </div>
        <ul className="perfil-menu">
          <li className={activeTab === "perfil" ? "active" : ""}>
            <button onClick={() => setActiveTab("perfil")}>
              <i className="fa fa-user"></i>
              <span>Meu Perfil</span>
            </button>
          </li>
          <li className={activeTab === "negociacoes" ? "active" : ""}>
            <button onClick={() => setActiveTab("negociacoes")}>
              <i className="fa fa-exchange"></i>
              <span>Minhas Negociações</span>
            </button>
          </li>
          <li>
            <Link to="/configuracoes">
              <i className="fa fa-cog"></i>
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="perfil-content">
        {activeTab === "perfil" && (
          <div className="perfil-info-section">
            <h2>Informações Pessoais</h2>
            <div className="perfil-info-card">
              <div className="perfil-info-item">
                <span className="info-label">Nome:</span>
                <span className="info-value">{usuario.nome}</span>
              </div>
              <div className="perfil-info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{usuario.email}</span>
              </div>
              <div className="perfil-info-item">
                <span className="info-label">Telefone:</span>
                <span className="info-value">
                  {usuario.telefone || "Não informado"}
                </span>
              </div>
              <div className="perfil-info-item">
                <span className="info-label">Data de Cadastro:</span>
                <span className="info-value">
                  {usuario.dataCadastro || "Não informado"}
                </span>
              </div>
            </div>

            <div className="perfil-actions">
              <button className="btn-editar-perfil">
                <i className="fa fa-pencil"></i>
                Editar Perfil
              </button>
              <button className="btn-alterar-senha">
                <i className="fa fa-lock"></i>
                Alterar Senha
              </button>
            </div>
          </div>
        )}

        {activeTab === "negociacoes" && (
          <div className="perfil-negociacoes-section">
            <div className="negociacoes-header">
              <h2>Minhas Negociações</h2>

              <div className="negociacoes-filtros">
                <div className="filtro-grupo">
                  <label htmlFor="filtro-status">Status:</label>
                  <select
                    id="filtro-status"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="filtro-select"
                  >
                    <option value="todas">Todas</option>
                    <option value="pendentes">Pendentes</option>
                    <option value="confirmadas">Confirmadas</option>
                  </select>
                </div>

                <div className="filtro-grupo">
                  <label htmlFor="filtro-tipo">Tipo:</label>
                  <select
                    id="filtro-tipo"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className="filtro-select"
                  >
                    <option value="todas">Todas</option>
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                </div>
              </div>
            </div>

            {loadingNegociacoes ? (
              <div className="negociacoes-loading">
                <div className="spinner"></div>
                <p>Carregando negociações...</p>
              </div>
            ) : feedbackNegociacoes ? (
              <div className="negociacoes-feedback">{feedbackNegociacoes}</div>
            ) : negociacoes.length > 0 ? (
              <>
                <div className="negociacoes-contador">
                  Exibindo {negociacoesExibidas.length} de {negociacoes.length}{" "}
                  negociações
                </div>

                <div className="negociacoes-compact-list">
                  {negociacoesExibidas.map((negociacao) => (
                    <div
                      key={negociacao.negociacao.negociacaoId}
                      className="negociacao-compact-card"
                    >
                      <div className="negociacao-compact-header">
                        <div className="negociacao-compact-id">
                          #
                          {negociacao.negociacao.negociacaoId
                            .toString()
                            .padStart(4, "0")}
                        </div>
                        <div className="negociacao-compact-badges">
                          <span
                            className={`negociacao-badge-small ${
                              negociacao.oferta.confirmada
                                ? "status-confirmada"
                                : "status-pendente"
                            }`}
                          >
                            {negociacao.oferta.confirmada
                              ? "Confirmada"
                              : "Pendente"}
                          </span>
                          <span
                            className={`negociacao-badge-small ${
                              negociacao.negociacao.usuarioIdComprador ===
                              usuario.id
                                ? "tipo-comprador"
                                : "tipo-vendedor"
                            }`}
                          >
                            {negociacao.negociacao.usuarioIdComprador ===
                            usuario.id
                              ? "Comprador"
                              : "Vendedor"}
                          </span>
                        </div>
                      </div>

                      <div className="negociacao-compact-info">
                        <div className="negociacao-compact-col">
                          <div className="negociacao-compact-item">
                            <i className="fa fa-plane"></i>
                            <span>{negociacao.oferta.ciaAerea}</span>
                          </div>
                          <div className="negociacao-compact-item">
                            <i className="fa fa-tag"></i>
                            <span>{negociacao.oferta.compraOuVenda}</span>
                          </div>
                        </div>

                        <div className="negociacao-compact-col">
                          <div className="negociacao-compact-item">
                            <i className="fa fa-money-bill"></i>
                            <span>
                              {formatarPreco(negociacao.oferta.preco)}
                            </span>
                          </div>
                          <div className="negociacao-compact-item">
                            <span className="milhas-icon-small">M</span>
                            <span>
                              {formatarMilhas(negociacao.oferta.qtdMilhas)}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/negociacoes/${negociacao.negociacao.negociacaoId}?ofertaId=${negociacao.oferta.ofertaId}`}
                          className="btn-compact-detalhes"
                        >
                          <i className="fa fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="sem-resultados">
                <i className="fa fa-search fa-3x"></i>
                <p>Você ainda não possui negociações.</p>
                <Link to="/ofertas" className="btn-ver-ofertas">
                  Ver ofertas disponíveis
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;
