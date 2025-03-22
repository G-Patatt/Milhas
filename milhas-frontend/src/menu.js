"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./menu.css"
import NotificacaoIcon from "./components/pages/NotificacaoIcone"
import LogoutModal from "./components/pages/LogoutModal"
import "font-awesome/css/font-awesome.min.css"

function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Obtenha o ID do usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  // Verificar se o usuário está logado
  const isLoggedIn = !!usuario && usuario?.id !== null
  // Se o usuário estiver logado, mostra o link de negociações
  const usuarioId = usuario?.id
  const negociacoesLink = usuarioId ? `/negociacoes/usuario/${usuarioId}` : "#"

  // Detecta o scroll para mudar o estilo do menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Verifica se o link está ativo
  const isActive = (path) => {
    return location.pathname === path
  }

  // Funções para o modal de logout
  const handleLogoutClick = (e) => {
    e.preventDefault() // Previne o comportamento padrão do link
    setShowLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    // Limpa os dados do usuário
    localStorage.removeItem("usuario")
    localStorage.removeItem("token")

    // Fecha o modal e redireciona para login
    setShowLogoutModal(false)
    navigate("/login")
  }

  const handleCancelLogout = () => {
    // Fecha o modal e redireciona para ofertas
    setShowLogoutModal(false)
    navigate("/ofertas")
  }

  // Função para lidar com o clique no botão de login
  const handleLoginClick = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <nav className={`menu-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="menu-container">
        <div className="menu-logo">
        <i className="fa fa-plane negociacao-icon"></i>
          <span>MilesExchange</span>
        </div>

        {/* Desktop Menu */}
        <ul className="menu-items">
          <li>
            <a href="/" className={`menu-item ${isActive("/") ? "active" : ""}`}>
              Home
            </a>
          </li>
          <li>
            <a href="/ofertas" className={`menu-item ${isActive("/ofertas") ? "active" : ""}`}>
              Ofertas
            </a>
          </li>
          <li>
            <a href="/contato" className={`menu-item ${isActive("/contato") ? "active" : ""}`}>
              Contato
            </a>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <a href={negociacoesLink} className={`menu-item ${isActive(negociacoesLink) ? "active" : ""}`}>
                  Minhas Negociações
                </a>
              </li>
              <li>
                {/* <a href="/reserva" className={`menu-item ${isActive("/reserva") ? "active" : ""}`}>
                  Reserva Limite
                </a> */}
              </li>
            </>
          )}
        </ul>

        <div className="menu-actions">
          {isLoggedIn && <NotificacaoIcon />}
          <div className="auth-button-container">
            {isLoggedIn ? (
              <a href="#" onClick={handleLogoutClick} className="auth-button">
                <i className="fa fa-sign-out"></i>
                <span>Logout</span>
              </a>
            ) : (
              <a href="#" onClick={handleLoginClick} className="auth-button">
                <i className="fa fa-sign-in"></i>
                <span>Login</span>
              </a>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-menu-items">
            <li>
              <a href="/" className={`mobile-menu-item ${isActive("/") ? "active" : ""}`}>
                Home
              </a>
            </li>
            <li>
              <a href="/ofertas" className={`mobile-menu-item ${isActive("/ofertas") ? "active" : ""}`}>
                Ofertas
              </a>
            </li>
            <li>
              <a href="/contato" className={`mobile-menu-item ${isActive("/contato") ? "active" : ""}`}>
                Contato
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <a href={negociacoesLink} className={`mobile-menu-item ${isActive(negociacoesLink) ? "active" : ""}`}>
                    Negociações
                  </a>
                </li>
                <li>
                  <a href="/reserva" className={`mobile-menu-item ${isActive("/reserva") ? "active" : ""}`}>
                    Reserva Limite
                  </a>
                </li>
              </>
            )}
            <li>
              {isLoggedIn ? (
                <a
                  href="#"
                  onClick={handleLogoutClick}
                  className={`mobile-menu-item ${isActive("/logout") ? "active" : ""}`}
                >
                  <i className="fa fa-sign-out"></i> Logout
                </a>
              ) : (
                <a
                  href="#"
                  onClick={handleLoginClick}
                  className={`mobile-menu-item ${isActive("/login") ? "active" : ""}`}
                >
                  <i className="fa fa-sign-in"></i> Login
                </a>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Modal de logout (agora como componente separado) */}
      <LogoutModal isOpen={showLogoutModal} onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
    </nav>
  )
}

export default Menu

