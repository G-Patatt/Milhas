"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./menu.css"
import NotificacaoIcon from "./components/pages/NotificacaoIcone"
import "font-awesome/css/font-awesome.min.css"

function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Obtenha o ID do usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || '{"id": null}')
  const usuarioId = usuario?.id

  // Se o usuário estiver logado, mostra o link de negociações
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

  return (
    <nav className={`menu-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="menu-container">
        <div className="menu-logo">
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
            <path d="M7 17l10-10M7 7l10 10"></path>
          </svg>
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
          <li>
            <a href={negociacoesLink} className={`menu-item ${isActive(negociacoesLink) ? "active" : ""}`}>
              Negociações
            </a>
          </li>
          <li>
            <a href="/reserva" className={`menu-item ${isActive("/reserva") ? "active" : ""}`}>
              Reserva Limite
            </a>
          </li>
        </ul>

        <div className="menu-actions">
          <NotificacaoIcon />
          <a href="/logout" className="logout-button">
            <i className="fa fa-sign-out"></i>
            <span>Logout</span>
          </a>

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
            <li>
              <a href="/logout" className={`mobile-menu-item ${isActive("/logout") ? "active" : ""}`}>
                <i className="fa fa-sign-out"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Menu

