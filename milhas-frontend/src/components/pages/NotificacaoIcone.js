"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import "../css/NotificacaoIcone.css"
import "font-awesome/css/font-awesome.min.css"

// Removendo qualquer importação que possa estar causando dependência circular

function NotificacaoIcon() {
  const [notificacoes, setNotificacoes] = useState(0) // Contador de notificações
  const [listaNotificacoes, setListaNotificacoes] = useState([]) // Lista de notificações
  const [usuarioLogado, setUsuarioLogado] = useState(true) // Definido como true por padrão para teste
  const [mostrarDropdown, setMostrarDropdown] = useState(false) // Estado para controlar a exibição do dropdown
  const notificacaoRef = useRef(null) // Referência para o componente de notificação

  // Função para buscar as notificações do usuário no backend
  const obterNotificacoes = async () => {
    try {
      // Tenta obter o usuário do localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario") || '{"id": 1}')
      const usuarioId = usuario?.id

      if (usuarioId) {
        // Se o usuário estiver logado, busca as notificações
        setUsuarioLogado(true)

        try {
          const response = await axios.get(`http://localhost:5000/api/usuarios/${usuarioId}/notificacoes`)
          // Atualiza o estado com o número de notificações
          setNotificacoes(response.data.notificacoes)
        } catch (error) {
          console.error("Erro ao obter contagem de notificações:", error)
          // Em caso de erro, simula algumas notificações para teste
          setNotificacoes(3)
        }

        // Tenta buscar a lista de notificações
        try {
          const listaResponse = await axios.get(`http://localhost:5000/api/usuarios/${usuarioId}/lista-notificacoes`)
          setListaNotificacoes(listaResponse.data || [])
        } catch (error) {
          console.error("Erro ao obter lista de notificações:", error)
          // Dados simulados em caso de erro
          setListaNotificacoes([
            { id: 1, mensagem: "Nova oferta de milhas disponível", data: "2023-11-15T10:30:00", lida: false },
            { id: 2, mensagem: "Sua negociação foi aceita", data: "2023-11-14T14:45:00", lida: false },
            { id: 3, mensagem: "Você recebeu uma nova avaliação", data: "2023-11-13T09:20:00", lida: true },
          ])
        }
      } else {
        // Mesmo sem usuário, vamos mostrar o ícone para teste
        setUsuarioLogado(true)
        setNotificacoes(3)
        setListaNotificacoes([
          { id: 1, mensagem: "Nova oferta de milhas disponível", data: "2023-11-15T10:30:00", lida: false },
          { id: 2, mensagem: "Sua negociação foi aceita", data: "2023-11-14T14:45:00", lida: false },
          { id: 3, mensagem: "Você recebeu uma nova avaliação", data: "2023-11-13T09:20:00", lida: true },
        ])
      }
    } catch (error) {
      console.error("Erro ao obter notificações:", error)
      // Em caso de erro, simula algumas notificações para teste
      setUsuarioLogado(true) // Forçar exibição para teste
      setNotificacoes(3)
      setListaNotificacoes([
        { id: 1, mensagem: "Nova oferta de milhas disponível", data: "2023-11-15T10:30:00", lida: false },
        { id: 2, mensagem: "Sua negociação foi aceita", data: "2023-11-14T14:45:00", lida: false },
        { id: 3, mensagem: "Você recebeu uma nova avaliação", data: "2023-11-13T09:20:00", lida: true },
      ])
    }
  }

  // Função para alternar a exibição do dropdown de notificações
  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown)
  }

  // Função para marcar uma notificação como lida
  const marcarComoLida = async (notificacaoId) => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || '{"id": 1}')
      const usuarioId = usuario?.id

      if (usuarioId) {
        // Tenta marcar a notificação como lida no backend
        await axios.post(`http://localhost:5000/api/usuarios/${usuarioId}/notificacoes/${notificacaoId}/lida`)

        // Atualiza a lista local
        setListaNotificacoes(
          listaNotificacoes.map((notif) => (notif.id === notificacaoId ? { ...notif, lida: true } : notif)),
        )

        // Atualiza o contador
        setNotificacoes((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)

      // Atualiza a lista local mesmo em caso de erro
      setListaNotificacoes(
        listaNotificacoes.map((notif) => (notif.id === notificacaoId ? { ...notif, lida: true } : notif)),
      )

      // Atualiza o contador
      setNotificacoes((prev) => Math.max(0, prev - 1))
    }
  }

  // Função para marcar todas as notificações como lidas
  const marcarTodasComoLidas = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || '{"id": 1}')
      const usuarioId = usuario?.id

      if (usuarioId) {
        // Tenta marcar todas as notificações como lidas no backend
        await axios.post(`http://localhost:5000/api/usuarios/${usuarioId}/notificacoes/todas-lidas`)

        // Atualiza a lista local
        setListaNotificacoes(listaNotificacoes.map((notif) => ({ ...notif, lida: true })))

        // Zera o contador
        setNotificacoes(0)
      }
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error)

      // Atualiza a lista local mesmo em caso de erro
      setListaNotificacoes(listaNotificacoes.map((notif) => ({ ...notif, lida: true })))

      // Zera o contador
      setNotificacoes(0)
    }
  }

  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificacaoRef.current && !notificacaoRef.current.contains(event.target)) {
        setMostrarDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Chama a função para buscar notificações assim que o componente for montado
  useEffect(() => {
    obterNotificacoes() // Busca as notificações do usuário

    // Opcional: Configurar um intervalo para verificar novas notificações periodicamente
    const intervalo = setInterval(() => {
      obterNotificacoes()
    }, 60000) // Verifica a cada minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalo)
  }, []) // O array vazio faz a requisição apenas uma vez, quando o componente é montado

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

  // Sempre renderizar o componente para teste
  return (
    <div className="notification-container" ref={notificacaoRef}>
      <div className="notification-icon" onClick={toggleDropdown}>
        <i className="fa fa-bell" style={{ fontSize: "20px" }}></i>
        {notificacoes > 0 && <span className="notification-badge">{notificacoes}</span>}
      </div>

      {mostrarDropdown && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificações</h3>
            {notificacoes > 0 && (
              <button className="mark-all-read" onClick={marcarTodasComoLidas}>
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="notification-list">
            {listaNotificacoes.length > 0 ? (
              listaNotificacoes.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${!notif.lida ? "unread" : ""}`}
                  onClick={() => !notif.lida && marcarComoLida(notif.id)}
                >
                  <div className="notification-content">
                    <p className="notification-message">{notif.mensagem}</p>
                    <span className="notification-time">{formatarData(notif.data)}</span>
                  </div>
                  {!notif.lida && <div className="unread-indicator"></div>}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <p>Você não tem notificações</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificacaoIcon

