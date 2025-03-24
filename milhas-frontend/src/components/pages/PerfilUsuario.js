"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import "../css/PerfilUsuario.css"

// Dados de teste para demonstração
const negociacoesTeste = [
  {
    negociacao: {
      negociacaoId: 1001,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 2,
      dataCriacao: "2023-03-15T10:30:00",
    },
    oferta: {
      ofertaId: 5001,
      ciaAerea: "Latam",
      preco: 3500,
      qtdMilhas: 100000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1002,
      usuarioIdComprador: 2,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-03-18T14:45:00",
    },
    oferta: {
      ofertaId: 5002,
      ciaAerea: "Gol",
      preco: 2800,
      qtdMilhas: 80000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1003,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 3,
      dataCriacao: "2023-04-02T09:15:00",
    },
    oferta: {
      ofertaId: 5003,
      ciaAerea: "Azul",
      preco: 1950,
      qtdMilhas: 50000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1004,
      usuarioIdComprador: 3,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-04-10T16:20:00",
    },
    oferta: {
      ofertaId: 5004,
      ciaAerea: "Smiles",
      preco: 4200,
      qtdMilhas: 120000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1005,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 4,
      dataCriacao: "2023-04-15T11:30:00",
    },
    oferta: {
      ofertaId: 5005,
      ciaAerea: "Latam",
      preco: 2100,
      qtdMilhas: 60000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1006,
      usuarioIdComprador: 4,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-04-22T13:45:00",
    },
    oferta: {
      ofertaId: 5006,
      ciaAerea: "Gol",
      preco: 3150,
      qtdMilhas: 90000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1007,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 5,
      dataCriacao: "2023-05-03T10:00:00",
    },
    oferta: {
      ofertaId: 5007,
      ciaAerea: "Azul",
      preco: 1750,
      qtdMilhas: 45000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1008,
      usuarioIdComprador: 5,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-05-12T15:30:00",
    },
    oferta: {
      ofertaId: 5008,
      ciaAerea: "Smiles",
      preco: 3850,
      qtdMilhas: 110000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1009,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 6,
      dataCriacao: "2023-05-20T09:45:00",
    },
    oferta: {
      ofertaId: 5009,
      ciaAerea: "Latam",
      preco: 2450,
      qtdMilhas: 70000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1010,
      usuarioIdComprador: 6,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-05-28T14:15:00",
    },
    oferta: {
      ofertaId: 5010,
      ciaAerea: "Gol",
      preco: 3300,
      qtdMilhas: 95000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1011,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 7,
      dataCriacao: "2023-06-05T11:00:00",
    },
    oferta: {
      ofertaId: 5011,
      ciaAerea: "Azul",
      preco: 2050,
      qtdMilhas: 55000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1012,
      usuarioIdComprador: 7,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-06-15T16:45:00",
    },
    oferta: {
      ofertaId: 5012,
      ciaAerea: "Smiles",
      preco: 4050,
      qtdMilhas: 115000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1013,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 8,
      dataCriacao: "2023-06-22T10:30:00",
    },
    oferta: {
      ofertaId: 5013,
      ciaAerea: "Latam",
      preco: 2250,
      qtdMilhas: 65000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1014,
      usuarioIdComprador: 8,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-06-30T13:15:00",
    },
    oferta: {
      ofertaId: 5014,
      ciaAerea: "Gol",
      preco: 3450,
      qtdMilhas: 98000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1015,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 9,
      dataCriacao: "2023-07-08T09:00:00",
    },
    oferta: {
      ofertaId: 5015,
      ciaAerea: "Azul",
      preco: 1850,
      qtdMilhas: 48000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1016,
      usuarioIdComprador: 9,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-07-18T15:45:00",
    },
    oferta: {
      ofertaId: 5016,
      ciaAerea: "Smiles",
      preco: 3950,
      qtdMilhas: 112000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1017,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 10,
      dataCriacao: "2023-07-25T11:30:00",
    },
    oferta: {
      ofertaId: 5017,
      ciaAerea: "Latam",
      preco: 2350,
      qtdMilhas: 68000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1018,
      usuarioIdComprador: 10,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-08-05T14:00:00",
    },
    oferta: {
      ofertaId: 5018,
      ciaAerea: "Gol",
      preco: 3250,
      qtdMilhas: 93000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
  {
    negociacao: {
      negociacaoId: 1019,
      usuarioIdComprador: 1,
      usuarioIdVendedor: 11,
      dataCriacao: "2023-08-12T10:15:00",
    },
    oferta: {
      ofertaId: 5019,
      ciaAerea: "Azul",
      preco: 1950,
      qtdMilhas: 52000,
      compraOuVenda: "Compra",
      confirmada: true,
    },
  },
  {
    negociacao: {
      negociacaoId: 1020,
      usuarioIdComprador: 11,
      usuarioIdVendedor: 1,
      dataCriacao: "2023-08-20T16:30:00",
    },
    oferta: {
      ofertaId: 5020,
      ciaAerea: "Smiles",
      preco: 4100,
      qtdMilhas: 118000,
      compraOuVenda: "Venda",
      confirmada: false,
    },
  },
]

const PerfilUsuario = () => {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("perfil")
  const [negociacoes, setNegociacoes] = useState([])
  const [loadingNegociacoes, setLoadingNegociacoes] = useState(false)
  const [feedbackNegociacoes, setFeedbackNegociacoes] = useState("")

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState("todas")
  const [filtroTipo, setFiltroTipo] = useState("todas")

  // Adicione estes estados para controlar a paginação logo após os estados de filtro
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina] = useState(5)

  useEffect(() => {
    // Simulando a busca de dados do usuário
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario") || "null")

    if (usuarioLocal && usuarioLocal.id === Number.parseInt(id)) {
      setUsuario(usuarioLocal)
      setLoading(false)
    } else {
      // Em um cenário real, você faria uma chamada à API aqui
      // Simulando uma chamada à API com setTimeout
      setTimeout(() => {
        setUsuario({
          id: 1, // ID fixo para corresponder aos dados de teste
          nome: "Usuário Exemplo",
          email: "usuario@exemplo.com",
          telefone: "(11) 99999-9999",
          dataCadastro: "01/01/2023",
        })
        setLoading(false)
      }, 1000)
    }
  }, [id])

  // Carregar negociações quando a aba for selecionada
  useEffect(() => {
    if (activeTab === "negociacoes" && usuario) {
      // Para fins de demonstração, usamos os dados de teste
      setLoadingNegociacoes(true)
      setTimeout(() => {
        setNegociacoes(negociacoesTeste)
        setLoadingNegociacoes(false)
      }, 1000)

      // Comentado o código real de API para usar os dados de teste
      // carregarNegociacoes()
    }
  }, [activeTab, usuario])

  // Função para carregar as negociações do usuário
  const carregarNegociacoes = () => {
    const token = localStorage.getItem("token")
    if (!token) return

    setLoadingNegociacoes(true)
    setFeedbackNegociacoes("")

    axios
      .get("http://localhost:5000/api/negociacao/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setNegociacoes(response.data)
        } else {
          setFeedbackNegociacoes("Nenhuma negociação encontrada")
        }
      })
      .catch((error) => {
        setFeedbackNegociacoes("Erro ao carregar as negociações.")
        console.error(error)
      })
      .finally(() => {
        setLoadingNegociacoes(false)
      })
  }

  // Função para filtrar negociações
  const negociacoesFiltradas = () => {
    // Primeiro aplicamos os filtros
    const negociacoesFiltradas = negociacoes.filter((negociacao) => {
      // Filtro por status
      if (filtroStatus !== "todas") {
        const statusNegociacao = negociacao.oferta.confirmada ? "confirmadas" : "pendentes"
        if (filtroStatus !== statusNegociacao) return false
      }

      // Filtro por tipo (comprador/vendedor)
      if (filtroTipo !== "todas") {
        const tipoNegociacao = negociacao.negociacao.usuarioIdComprador === usuario.id ? "comprador" : "vendedor"
        if (filtroTipo !== tipoNegociacao) return false
      }

      return true
    })

    return {
      total: negociacoesFiltradas.length,
      negociacoes: negociacoesFiltradas,
    }
  }

  // Adicione esta função para obter as negociações da página atual
  const getNegociacoesPaginadas = () => {
    const { negociacoes: filtradas } = negociacoesFiltradas()

    // Calcular índices para a página atual
    const indexInicial = (paginaAtual - 1) * itensPorPagina
    const indexFinal = indexInicial + itensPorPagina

    // Retornar apenas os itens da página atual
    return filtradas.slice(indexInicial, indexFinal)
  }

  // Adicione esta função para mudar de página
  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina)
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

  if (loading) {
    return (
      <div className="perfil-container">
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin"></i>
          <span>Carregando perfil...</span>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="error-message">
          <i className="fa fa-exclamation-triangle"></i>
          <span>Usuário não encontrado</span>
        </div>
      </div>
    )
  }

  const { total } = negociacoesFiltradas()
  const negociacoesExibidas = getNegociacoesPaginadas()
  const totalPaginas = Math.ceil(total / itensPorPagina)

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
                <span className="info-value">{usuario.telefone || "Não informado"}</span>
              </div>
              <div className="perfil-info-item">
                <span className="info-label">Data de Cadastro:</span>
                <span className="info-value">{usuario.dataCadastro || "Não informado"}</span>
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
                  Exibindo {negociacoesExibidas.length} de {total} negociações
                </div>

                <div className="negociacoes-compact-list">
                  {negociacoesExibidas.map((negociacao) => (
                    <div key={negociacao.negociacao.negociacaoId} className="negociacao-compact-card">
                      <div className="negociacao-compact-header">
                        <div className="negociacao-compact-id">
                          #{negociacao.negociacao.negociacaoId.toString().padStart(4, "0")}
                        </div>
                        <div className="negociacao-compact-badges">
                          <span
                            className={`negociacao-badge-small ${negociacao.oferta.confirmada ? "status-confirmada" : "status-pendente"}`}
                          >
                            {negociacao.oferta.confirmada ? "Confirmada" : "Pendente"}
                          </span>
                          <span
                            className={`negociacao-badge-small ${negociacao.negociacao.usuarioIdComprador === usuario.id ? "tipo-comprador" : "tipo-vendedor"}`}
                          >
                            {negociacao.negociacao.usuarioIdComprador === usuario.id ? "Comprador" : "Vendedor"}
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
                            <span>{formatarPreco(negociacao.oferta.preco)}</span>
                          </div>
                          <div className="negociacao-compact-item">
                            <span className="milhas-icon-small">M</span>
                            <span>{formatarMilhas(negociacao.oferta.qtdMilhas)}</span>
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
                {total > 0 && (
                  <div className="negociacoes-paginacao">
                    <button
                      className="btn-pagina"
                      disabled={paginaAtual === 1}
                      onClick={() => mudarPagina(paginaAtual - 1)}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>

                    {[...Array(totalPaginas)].map((_, index) => (
                      <button
                        key={index}
                        className={`btn-pagina ${paginaAtual === index + 1 ? "ativo" : ""}`}
                        onClick={() => mudarPagina(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      className="btn-pagina"
                      disabled={paginaAtual === totalPaginas}
                      onClick={() => mudarPagina(paginaAtual + 1)}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                )}
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
  )
}

export default PerfilUsuario

