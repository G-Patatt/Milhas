"use client"

import { useState, useEffect } from "react"
import "../css/Home.css"

import FaqSection from "../pages/FaqSection"

import PipelineSection from "../pages/PipelineSection.js"

export default function Home() {
  const [trendingMiles, setTrendingMiles] = useState([
    { program: "AirMiles", price: 0.0235, change: 3.2 },
    { program: "SkyPoints", price: 0.0312, change: -1.4 },
    { program: "TravelPass", price: 0.0189, change: 5.7 },
    { program: "GlobeMiles", price: 0.0276, change: 2.1 },
    { program: "StarAlliance", price: 0.0298, change: -0.8 },
  ])

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingMiles((prev) =>
        prev.map((item) => ({
          ...item,
          price: Number.parseFloat((item.price + (Math.random() * 0.002 - 0.001)).toFixed(4)),
          change: Number.parseFloat((item.change + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="miles-exchange">
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="badge">Novo no Brasil</div>
                <h1 className="hero-title">Compre e venda milhas como ações na bolsa</h1>
                <p className="hero-description">
                  Negocie milhas aéreas em tempo real, encontre as melhores ofertas e maximize o valor dos seus
                  programas de fidelidade.
                </p>
                <div className="hero-buttons">
                  <button className="btn btn-primary btn-lg">Começar a negociar</button>
                  <button className="btn btn-outline btn-lg">Ver cotações</button>
                </div>
              </div>
              <div className="market-preview">
                <div className="market-card">
                  <div className="market-header">
                    <div className="market-title">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span>Mercado de Milhas</span>
                    </div>
                    <div className="market-update">Atualizado em tempo real</div>
                  </div>
                  <div className="market-content">
                    {trendingMiles.map((item, index) => (
                      <div key={index} className="market-item">
                        <div className="program-info">
                          <div className="program-avatar">{item.program.charAt(0)}</div>
                          <div>
                            <div className="program-name">{item.program}</div>
                            <div className="program-type">Programa de Fidelidade</div>
                          </div>
                        </div>
                        <div className="program-price">
                          <div className="price-value">R$ {item.price.toFixed(4)}</div>
                          <div className={`price-change ${item.change >= 0 ? "positive" : "negative"}`}>
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Section - Atualizada com o novo fluxo */}
        <PipelineSection />

        {/* FAQ Section - Nova seção adicionada logo após o Pipeline */}
        <FaqSection />

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Por que negociar na MilesExchange?</h2>
              <p className="section-description">
                Nossa plataforma oferece a maneira mais eficiente e transparente de comprar e vender milhas aéreas.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
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
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <h3 className="feature-title">Preços em Tempo Real</h3>
                <p className="feature-description">
                  Acompanhe as cotações de milhas atualizadas instantaneamente, como em uma bolsa de valores.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="feature-title">Comunidade Ativa</h3>
                <p className="feature-description">
                  Conecte-se com milhares de viajantes e investidores que negociam milhas diariamente.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="feature-title">Transações Seguras</h3>
                <p className="feature-description">
                  Todas as negociações são protegidas e garantidas pela nossa plataforma certificada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">O que nossos usuários dizem</h2>
              <p className="section-description">
                Milhares de pessoas já estão aproveitando as vantagens da MilesExchange
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar"></div>
                  <div>
                    <div className="testimonial-name">Carlos Silva</div>
                    <div className="testimonial-role">Viajante frequente</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Consegui vender minhas milhas por um preço muito melhor do que nas plataformas tradicionais. O
                  processo foi rápido e seguro."
                </p>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar"></div>
                  <div>
                    <div className="testimonial-name">Ana Oliveira</div>
                    <div className="testimonial-role">Investidora</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Descobri uma nova forma de investimento! Compro milhas quando estão em baixa e revendo quando
                  valorizam. A plataforma é excelente."
                </p>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar"></div>
                  <div>
                    <div className="testimonial-name">Marcelo Santos</div>
                    <div className="testimonial-role">Empresário</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Uso a MilesExchange para gerenciar as milhas da minha empresa. A transparência nos preços e a
                  facilidade de negociação são incomparáveis."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-grid">
              <div className="cta-content">
                <h2 className="cta-title">Pronto para começar a negociar?</h2>
                <p className="cta-description">
                  Junte-se a milhares de usuários e comece a maximizar o valor das suas milhas hoje mesmo.
                </p>
              </div>
              <div className="cta-buttons">
                <button className="btn btn-secondary btn-lg">Saiba mais</button>
                <button className="btn btn-white btn-lg">Criar conta grátis</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="logo">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="logo-icon"
                >
                  <path d="M7 17l10-10M7 7l10 10"></path>
                </svg>
                <span className="logo-text">MilesExchange</span>
              </div>
              <p className="footer-description">
                A primeira bolsa de valores de milhas do Brasil. Negocie com segurança e transparência.
              </p>
            </div>

            <div className="footer-links">
              <h3 className="footer-title">Plataforma</h3>
              <ul className="footer-menu">
                <li>
                  <a href="#" className="footer-link">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Programas
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Cotações
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Histórico
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3 className="footer-title">Empresa</h3>
              <ul className="footer-menu">
                <li>
                  <a href="#" className="footer-link">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-menu">
                <li>
                  <a href="#" className="footer-link">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Segurança
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} MilesExchange. Todos os direitos reservados.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-link">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

