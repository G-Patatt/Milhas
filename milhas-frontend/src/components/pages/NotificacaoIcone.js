"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Notificacao.css";

function NotificacaoIcon() {
  const [notificacoes, setNotificacoes] = useState(0); // Contador de notificações
  const [usuarioLogado, setUsuarioLogado] = useState(false); // Estado para verificar se o usuário está logado

  // Função para buscar as notificações do usuário no backend
  const obterNotificacoes = async () => {
    try {
      // Tenta obter o usuário do localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const usuarioId = usuario?.id;

      if (usuarioId) {
        // Se o usuário estiver logado, busca as notificações
        setUsuarioLogado(true);
        const response = await axios.get(
          `http://localhost:5000/api/usuarios/${usuarioId}/notificacoes`
        );

        // Atualiza o estado com o número de notificações
        setNotificacoes(response.data.notificacoes);
      } else {
        setUsuarioLogado(false); // Se não houver usuarioId, significa que o usuário não está logado
      }
    } catch (error) {
      console.error("Erro ao obter notificações:", error);
    }
  };

  // Chama a função para buscar notificações assim que o componente for montado
  useEffect(() => {
    obterNotificacoes(); // Busca as notificações do usuário

    // Opcional: Configurar um intervalo para verificar novas notificações periodicamente
    const intervalo = setInterval(() => {
      obterNotificacoes();
    }, 60000); // Verifica a cada minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalo);
  }, []); // O array vazio faz a requisição apenas uma vez, quando o componente é montado

  if (!usuarioLogado) {
    return null; // Se o usuário não estiver logado, retorna null e não renderiza nada
  }

  return (
    <div className="notification-icon">
      <i className="fa fa-bell"></i>
      {notificacoes > 0 && (
        <span className="notification-badge">{notificacoes}</span>
      )}
    </div>
  );
}

export default NotificacaoIcon;
