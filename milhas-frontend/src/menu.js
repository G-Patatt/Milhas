import React from 'react';
import './menu.css';  // Caminho correto para importar o CSS
import NotificacaoIcon from './components/pages/NotificacaoIcone';

function Menu() {
  // Obtenha o ID do usuário logado do localStorage
  const usuarioId = localStorage.getItem('usuarioId');

  // Se o usuário estiver logado, mostra o link de negociações
  const negociacoesLink = usuarioId ? `/negociacoes/usuario/${usuarioId}` : '#';

  return (
    <div className="menu-navbar">
      <ul className="menu-navbar-list">
        <li><a href="/" className="menu-navbar-item">Home</a></li>
        <li><a href="/ofertas" className="menu-navbar-item">Ofertas</a></li>
        <li><a href="/contato" className="menu-navbar-item">Contato</a></li>
        <li><a href={negociacoesLink} className="menu-navbar-item">Negociações</a></li>
        <li><a href="/logout" className="menu-navbar-item">Logout</a></li>
        <li><a href="/guia-usuario" className="menu-navbar-item">Como Funciona</a></li>
        <NotificacaoIcon />
      </ul>
    </div>
  );
}

export default Menu;    
 