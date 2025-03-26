"use client"

import { useState, useEffect, useRef } from "react"
import "../css/NotificacaoCompleta.css"
import "font-awesome/css/font-awesome.min.css"

function NotificacaoCompleta() {
  const [notificacoes, setNotificacoes] = useState(3) // Contador de notificações
  const [listaNotificacoes, setListaNotificacoes] = useState([
    { id: 1, mensagem: "Nova oferta de milhas disponível", data: "2023-11-15T10:30:00", lida: false },
    { id: 2, mensagem: "Sua negociação foi aceita", data: "2023-11-14T14:45:00", lida: false },
    { id: 3, mensagem: "Você recebeu uma nova avaliação", data: "2023-11-13T09:20:00", lida: true },
  ]) // Lista de notificações
  const [mostrarDropdown, setMostrarDropdown] = useState(false) // Estado para controlar a exibição do dropdown
  const [fechandoDropdown, setFechandoDropdown] = useState(false) // Estado para controlar a animação de fechamento
  const notificacaoRef = useRef(null) // Referência para o componente de notificação
  const dropdownRef = useRef(null) // Referência para o dropdown

  // Função para alternar a exibição do dropdown de notificações
  const toggleDropdown = () => {
    if (mostrarDropdown) {
      fecharDropdownComAnimacao()
    } else {
      setMostrarDropdown(true)
      setFechandoDropdown(false)
    }
  }

  // Função para fechar o dropdown com animação
  const fecharDropdownComAnimacao = () => {
    setFechandoDropdown(true)
    setTimeout(() => {
      setMostrarDropdown(false)
      setFechandoDropdown(false)
    }, 300) // Tempo da animação em ms
  }

  // Função para marcar uma notificação como lida
  const marcarComoLida = (notificacaoId) => {
    // Atualiza a lista local
    setListaNotificacoes(
      listaNotificacoes.map((notif) => (notif.id === notificacaoId ? { ...notif, lida: true } : notif)),
    )

    // Atualiza o contador
    setNotificacoes((prev) => Math.max(0, prev - 1))
  }

  // Função para marcar todas as notificações como lidas
  const marcarTodasComoLidas = (e) => {
    // Previne a propagação do evento para não abrir o dropdown
    if (e) e.stopPropagation()

    // Atualiza a lista local
    setListaNotificacoes(listaNotificacoes.map((notif) => ({ ...notif, lida: true })))

    // Zera o contador
    setNotificacoes(0)

    // Fecha o dropdown com animação se estiver aberto
    if (mostrarDropdown) {
      fecharDropdownComAnimacao()
    }
  }

  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificacaoRef.current && !notificacaoRef.current.contains(event.target)) {
        if (mostrarDropdown) {
          fecharDropdownComAnimacao()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mostrarDropdown])

  // Formata a data para exibição
  const formatarData = (dataString) => {
    const data = new Date(dataString)
    const hoje = new Date()
    const ontem = new Date(hoje)
    ontem.setDate(hoje.getDate() - 1)

    if (data.toDateString() === hoje.toDateString()) {
      return `Hoje às ${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}`
    } else if (data.toDateString() === ontem.toDateString()) {
      return `Ontem às ${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}`
    } else {
      return `${data.getDate().toString().padStart(2, "0")}/${(data.getMonth() + 1).toString().padStart(2, "0")}/${data.getFullYear()} às ${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}`
    }
  }

  return (
    <div className="notificacao-container" ref={notificacaoRef}>
      {/* Container para o ícone de notificação */}
      <div className="notificacao-wrapper">
        {/* Ícone de notificação */}
        <div className="notificacao-icone" onClick={toggleDropdown}>
          <i className="fa fa-bell" style={{ fontSize: "20px" }}></i>
          {notificacoes > 0 && <span className="notificacao-badge">{notificacoes}</span>}
        </div>
      </div>

      {/* Dropdown de notificações */}
      {mostrarDropdown && (
        <div ref={dropdownRef} className={`notificacao-dropdown ${fechandoDropdown ? "dropdown-closing" : ""}`}>
          <div className="notificacao-header">
            <h3 className="notificacao-titulo">Notificações</h3>
            {notificacoes > 0 && (
              <button className="marcar-lidas-botao" onClick={(e) => marcarTodasComoLidas(e)}>
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="notificacao-lista">
            {listaNotificacoes.length > 0 ? (
              listaNotificacoes.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => !notif.lida && marcarComoLida(notif.id)}
                  className={`notificacao-item ${!notif.lida ? "nao-lida" : ""}`}
                >
                  <div className="notificacao-conteudo">
                    <p className="notificacao-mensagem">{notif.mensagem}</p>
                    <span className="notificacao-tempo">{formatarData(notif.data)}</span>
                  </div>
                  {!notif.lida && <div className="indicador-nao-lida"></div>}
                </div>
              ))
            ) : (
              <div className="sem-notificacoes">
                <p>Você não tem notificações</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificacaoCompleta

