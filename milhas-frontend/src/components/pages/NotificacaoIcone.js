import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios para fazer requisições
import '../css/Notificacao.css'; // Importa o arquivo CSS

function NotificacaoIcon() {
  const [notificacoes, setNotificacoes] = useState(0); // Contador de notificações
  const [usuarioLogado, setUsuarioLogado] = useState(false); // Estado para verificar se o usuário está logado

  // Função para buscar as notificações do usuário no backend
  const obterNotificacoes = async () => {
    try {
      // Pegue o ID do usuário (aqui você precisa substituir com a lógica de autenticação)
      const usuarioId = localStorage.getItem('usuarioId'); // Exemplo de pegar ID do localStorage

      if (usuarioId) {
        // Se o usuário estiver logado, busca as notificações
        setUsuarioLogado(true);
        const response = await axios.get(`http://localhost:5000/api/usuarios/${usuarioId}/notificacoes`);
        
        // Atualiza o estado com o número de notificações
        setNotificacoes(response.data.notificacoes);
      } else {
        setUsuarioLogado(false); // Se não houver usuarioId, significa que o usuário não está logado
      }
    } catch (error) {
      console.error('Erro ao obter notificações:', error);
    }
  };

  // Chama a função para buscar notificações assim que o componente for montado
  useEffect(() => {
    obterNotificacoes(); // Busca as notificações do usuário
  }, []); // O array vazio faz a requisição apenas uma vez, quando o componente é montado

  if (!usuarioLogado) {
    return null; // Se o usuário não estiver logado, retorna null e não renderiza nada
  }

  return (
    <div className="notificacao">
      <i className="fa fa-bell"></i> {/* Ícone do sino */}
      {notificacoes > 0 && <span className="badge">{notificacoes}</span>} {/* Exibe o número de notificações */}
    </div>
  );
}

export default NotificacaoIcon;
