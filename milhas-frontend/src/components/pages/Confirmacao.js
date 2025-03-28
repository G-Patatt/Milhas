"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import "../css/Confirmacao.css"

function Confirmacao() {
  const { ofertaId } = useParams()
  const navigate = useNavigate()
  const [oferta, setOferta] = useState(null)
  const [usuarioComprador, setUsuarioComprador] = useState(null)
  const [usuarioVendedor, setUsuarioVendedor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const currentUsuarioId = JSON.parse(localStorage.getItem("usuario"))?.id
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!currentUsuarioId || !token) {
      navigate("/login")
      return
    }
    const buscarOferta = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/ofertas/${ofertaId}`)
        const ofertaData = response.data
        setOferta(ofertaData)

        const compradorId = ofertaData.compraOuVenda === "venda" ? currentUsuarioId : ofertaData.usuarioId
        const vendedorId = ofertaData.compraOuVenda === "venda" ? ofertaData.usuarioId : currentUsuarioId

        const comprador = await buscarUsuariosPorId(compradorId)
        const vendedor = await buscarUsuariosPorId(vendedorId)

        setUsuarioComprador(comprador)
        setUsuarioVendedor(vendedor)
      } catch (err) {
        setError("Erro ao carregar a oferta.")
      } finally {
        setLoading(false)
      }
    }

    buscarOferta()
  }, [ofertaId, currentUsuarioId, navigate, token])

  const buscarUsuariosPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/usuarios/${id}`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      return null
    }
  }

  const confirmarOferta = async () => {
    if (usuarioComprador.id === usuarioVendedor.id) {
      setError("Você não pode comprar/vender para si mesmo.")
      return
    }

    try {
      const response = await axios.post("http://localhost:5001/api/ofertas/confirmarOferta", {
        ofertaId,
        currentUsuarioId,
      })
      if (response.data && response.data.negociacaoId) {
        navigate(`/negociacoes/${response.data.negociacaoId}`)
      } else {
        setError("Erro ao confirmar a oferta. Negociação não encontrada.")
      }
    } catch (err) {
      setError("Erro ao confirmar a oferta.")
    }
  }

  const recusarOferta = () => {
    navigate("/ofertas")
  }

  const formatarNumero = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const formatarPreco = (preco) => {
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  if (loading) {
    return (
      <div className="compact-loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="compact-confirmation">
      <div className="compact-card">
        <div className="compact-header">
          <h2>Confirmação</h2>
        </div>

        {error && <div className="compact-error">{error}</div>}

        {oferta ? (
          <div className="compact-content">
            <div className="compact-info-grid">
              <div className="compact-info-item">
                <label>Usuário Vendedor</label>
                <span>{usuarioVendedor?.nome}</span>
              </div>

              <div className="compact-info-item">
                <label>Usuário Comprador</label>
                <span>{usuarioComprador?.nome}</span>
              </div>

              <div className="compact-info-item">
                <label>Valor</label>
                <span className="highlight">{formatarPreco(oferta.preco)}</span>
              </div>

              <div className="compact-info-item">
                <label>Quantidade de Milhas</label>
                <span className="highlight">{formatarNumero(oferta.qtdMilhas)}</span>
              </div>
            </div>

            <div className="compact-actions">
              <button className="compact-btn cancel" onClick={recusarOferta}>
                Cancelar
              </button>
              <button className="compact-btn confirm" onClick={confirmarOferta} disabled={!!error}>
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <div className="compact-not-found">
            <p>Oferta não encontrada.</p>
            <button className="compact-btn" onClick={() => navigate("/ofertas")}>
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Confirmacao

