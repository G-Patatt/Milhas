"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import "./menu.css"
// Importando o novo componente de notificação
import NotificacaoCompleta from "./components/pages/NotificacaoCompleta"
import LogoutModal from "./components/pages/LogoutModal"
import "font-awesome/css/font-awesome.min.css"

function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  // Obtenha o ID do usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  // Verificar se o usuário está logado
  const isLoggedIn = !!usuario && usuario?.id !== null
  // Se o usuário estiver logado, mostra o link de negociações
  const usuarioId = usuario?.id
  const negociacoesLink = usuarioId ? `/negociacoes/usuario/${usuarioId}` : "#"
  const perfilLink = usuarioId ? `/perfil/${usuarioId}` : "#"

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

  // Fecha o menu do usuário quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
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

  // Função para alternar o menu do usuário
  const toggleUserMenu = (e) => {
    e.preventDefault()
    setUserMenuOpen(!userMenuOpen)
  }

  // Função para navegar para a home
  const navigateToHome = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <nav className={`menu-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="menu-container">
        <div className="menu-logo" onClick={navigateToHome} style={{ cursor: "pointer" }}>
          <i className="fa fa-plane" style={{ marginRight: "8px", fontSize: "20px" }}></i>
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
                  Negociações
                </a>
              </li>
            </>
          )}
        </ul>

        <div className="menu-actions">
          {/* Usando o novo componente de notificação */}
          <NotificacaoCompleta />

          {isLoggedIn && (
            <div className="user-menu-container" ref={userMenuRef}>
              <button onClick={toggleUserMenu} className="user-icon-button">
                <i className="fa fa-user-circle-o"></i>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <span className="user-name">{usuario.nome || "Usuário"}</span>
                    <span className="user-email">{usuario.email || ""}</span>
                  </div>
                  <ul className="user-menu-items">
                    <li>
                      <Link to={perfilLink} className="user-menu-item">
                        <i className="fa fa-user"></i> Meu Perfil
                      </Link>
                    </li>
                    <li className="menu-divider"></li>
                    <li>
                      <a href="#" onClick={handleLogoutClick} className="user-menu-item logout-item">
                        <i className="fa fa-sign-out"></i> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <div className="auth-button-container">
            {!isLoggedIn && (
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
                  <a href={perfilLink} className={`mobile-menu-item ${isActive(perfilLink) ? "active" : ""}`}>
                    <i className="fa fa-user"></i> Meu Perfil
                  </a>
                </li>
                <li>
                  <a href={negociacoesLink} className={`mobile-menu-item ${isActive(negociacoesLink) ? "active" : ""}`}>
                    <i className="fa fa-exchange"></i> Negociações
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

