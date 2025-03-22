"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/Negociacoes.css" // Importando o arquivo CSS personalizado

function NegociacoesUsuario() {
  const [negociacoes, setNegociacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todas")
  const navigate = useNavigate()

  // Verifique se há um token armazenado
  const token = localStorage.getItem("token")
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}")

  // Carregar as negociações do usuário
  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    setLoading(true)
    axios
      .get("http://localhost:5000/api/negociacao/usuario", {
        headers: { Authorization: `Bearer ${token}` }, // Envia o token com a requisição
      })
      .then((response) => {
        if (response.status === 200) {
          setNegociacoes(response.data)
          setFeedback("")
        } else {
          setFeedback("Nenhuma negociação encontrada")
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Se o erro for 401, token expirou ou não autorizado
          setFeedback("Sessão expirada. Redirecionando para login...")
          localStorage.removeItem("token") // Remove o token expirado
          navigate("/login") // Redireciona para a página de login
        } else {
          setFeedback("Erro ao carregar as negociações.")
          console.error(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token, navigate])

  // Navegar para os detalhes de uma negociação
  const handleNavigate = (negociacaoId, ofertaId) => {
    navigate(`/negociacoes/${negociacaoId}?ofertaId=${ofertaId}`)
  }

  // Função para formatar o preço
  const formatarPreco = (preco) => {
    return Number.parseFloat(preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  // Função para formatar a quantidade de milhas
  const formatarMilhas = (milhas) => {
    return Number.parseInt(milhas).toLocaleString("pt-BR")
  }

  // Função para determinar o status da negociação
  const getStatusNegociacao = (negociacao) => {
    if (negociacao.oferta.confirmada) {
      return "Confirmada"
    } else {
      return "Pendente"
    }
  }

  // Função para determinar a classe do badge de status
  const getStatusClass = (negociacao) => {
    if (negociacao.oferta.confirmada) {
      return "status-confirmada"
    } else {
      return "status-pendente"
    }
  }

  // Função para determinar se o usuário é comprador ou vendedor
  const getTipoUsuario = (negociacao) => {
    if (negociacao.negociacao.usuarioIdComprador === usuario.id) {
      return "Comprador"
    } else if (negociacao.negociacao.usuarioIdVendedor === usuario.id) {
      return "Vendedor"
    } else {
      return "Desconhecido"
    }
  }

  // Função para determinar a classe do badge de tipo de usuário
  const getTipoUsuarioClass = (negociacao) => {
    if (negociacao.negociacao.usuarioIdComprador === usuario.id) {
      return "tipo-comprador"
    } else if (negociacao.negociacao.usuarioIdVendedor === usuario.id) {
      return "tipo-vendedor"
    } else {
      return ""
    }
  }

  // Filtrar negociações por status
  const negociacoesFiltradas = negociacoes.filter((negociacao) => {
    if (filtroStatus === "todas") return true
    if (filtroStatus === "confirmadas") return negociacao.oferta.confirmada
    if (filtroStatus === "pendentes") return !negociacao.oferta.confirmada
    return true
  })

  return (
    <div className="negociacoes-container">
      <div className="negociacoes-header">
        <h1>Minhas Negociações</h1>
        <p className="negociacoes-subtitle">Acompanhe todas as suas transações de milhas</p>
      </div>

      {/* Seção de filtros */}
      <div className="filtros-container">
        <div className="filtros-header">
          <h2>Filtros</h2>
        </div>
        <div className="filtros-grid">
          {/* Filtro por status */}
          <div className="filtro-grupo">
            <label className="filtro-label">Status da negociação</label>
            <div className="filtro-opcoes">
              <label className={`filtro-opcao ${filtroStatus === "todas" ? "ativo" : ""}`}>
                <input
                  type="radio"
                  name="status"
                  value="todas"
                  checked={filtroStatus === "todas"}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                />
                <span>Todas</span>
              </label>
              <label className={`filtro-opcao ${filtroStatus === "confirmadas" ? "ativo" : ""}`}>
                <input
                  type="radio"
                  name="status"
                  value="confirmadas"
                  checked={filtroStatus === "confirmadas"}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                />
                <span>Confirmadas</span>
              </label>
              <label className={`filtro-opcao ${filtroStatus === "pendentes" ? "ativo" : ""}`}>
                <input
                  type="radio"
                  name="status"
                  value="pendentes"
                  checked={filtroStatus === "pendentes"}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                />
                <span>Pendentes</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados da filtragem */}
      <div className="resultados-info">
        {!loading && (
          <p>
            {negociacoesFiltradas.length}{" "}
            {negociacoesFiltradas.length === 1 ? "negociação encontrada" : "negociações encontradas"}
            {filtroStatus !== "todas" && " com os filtros aplicados"}
          </p>
        )}
      </div>

      {/* Mostrar a mensagem de feedback (erro ou ausência de negociações) */}
      {feedback && <div className="negociacoes-feedback">{feedback}</div>}

      {/* Mostrar indicador de carregamento */}
      {loading ? (
        <div className="negociacoes-loading">
          <div className="spinner"></div>
          <p>Carregando negociações...</p>
        </div>
      ) : negociacoesFiltradas.length > 0 ? (
        <div className="negociacoes-grid">
          {negociacoesFiltradas.map((negociacao) => (
            <div key={negociacao.negociacao.negociacaoId} className="negociacao-card">
              <div className="negociacao-card-header">
                <div className="negociacao-badges">
                  <span className={`negociacao-badge ${getStatusClass(negociacao)}`}>
                    <i className="fa fa-circle icon-margin-right"></i>
                    {getStatusNegociacao(negociacao)}
                  </span>
                  <span className={`negociacao-badge ${getTipoUsuarioClass(negociacao)}`}>
                    <i className="fa fa-user icon-margin-right"></i>
                    {getTipoUsuario(negociacao)}
                  </span>
                </div>
                <h3 className="negociacao-titulo">
                  Negociação #{negociacao.negociacao.negociacaoId.toString().padStart(4, "0")}
                </h3>
              </div>

              <div className="negociacao-card-body">
                <div className="negociacao-info">
                  <div className="negociacao-info-item">
                    <i className="fa fa-plane negociacao-icon"></i>
                    <div>
                      <span className="negociacao-label">Companhia</span>
                      <span className="negociacao-valor">{negociacao.oferta.ciaAerea}</span>
                    </div>
                  </div>

                  <div className="negociacao-info-item">
                    <i className="fa fa-money-bill-wave negociacao-icon"></i>
                    <div>
                      <span className="negociacao-label">Preço</span>
                      <span className="negociacao-valor">{formatarPreco(negociacao.oferta.preco)}</span>
                    </div>
                  </div>

                  <div className="negociacao-info-item">
                    <div className="milhas-icon">
                      <span>M</span>
                    </div>
                    <div>
                      <span className="negociacao-label">Quantidade</span>
                      <span className="negociacao-valor">{formatarMilhas(negociacao.oferta.qtdMilhas)} milhas</span>
                    </div>
                  </div>

                  <div className="negociacao-info-item">
                    <i className="fa fa-tag negociacao-icon"></i>
                    <div>
                      <span className="negociacao-label">Tipo de Oferta</span>
                      <span className="negociacao-valor">{negociacao.oferta.compraOuVenda}</span>
                    </div>
                  </div>
                </div>

                <div className="negociacao-preco-unitario">
                  <span className="negociacao-label">Preço por 1.000 milhas</span>
                  <span className="negociacao-valor-destaque">
                    {formatarPreco((negociacao.oferta.preco / negociacao.oferta.qtdMilhas) * 1000)}
                  </span>
                </div>
              </div>

              <div className="negociacao-card-footer">
                <button
                  className="btn-ver-detalhes"
                  onClick={() =>
                    handleNavigate(negociacao.negociacao.negociacaoId, negociacao.oferta.ofertaId)
                  }
                >
                  Ver Detalhes
                  <i className="fa fa-arrow-right icon-margin-left"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sem-resultados">
          <i className="fa fa-search fa-3x"></i>
          <p>Nenhuma negociação encontrada com os filtros selecionados.</p>
          {filtroStatus !== "todas" && (
            <button className="btn-limpar-filtros" onClick={() => setFiltroStatus("todas")}>
              Mostrar todas as negociações
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default NegociacoesUsuario
