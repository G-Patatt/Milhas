"use client"
import "../css/Home.css"
import { useNavigate } from "react-router-dom"
import FaqSection from "../pages/FaqSection"
import PipelineSection from "../pages/PipelineSection.js"

export default function Home() {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }
  console.log("🚀 Testando CI/CD com deploy.sh");

  return (
    <div className="miles-exchange">
      <main>
        {/* Hero Section - Enhanced with gradient background */}
        <section className="hero-section enhanced">
          <div className="hero-background">
            <div className="hero-shape shape-1"></div>
            <div className="hero-shape shape-2"></div>
            <div className="hero-shape shape-3"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="badge animated">Novo no Brasil</div>
              <h1 className="hero-title">Compre e venda milhas como ações na bolsa</h1>
              <p className="hero-description">
                Negocie milhas aéreas em tempo real, encontre as melhores ofertas e maximize o valor dos seus programas
                de fidelidade.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-lg pulse" onClick={() => handleNavigation("/ofertas")}>
                  Começar a negociar
                </button>
                <button
                  className="btn btn-outline btn-lg hover-effect"
                  onClick={() => handleNavigation("/processo-detalhado")}
                >
                  Saiba mais
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Section - Atualizada com o novo fluxo */}
        <PipelineSection />

        {/* FAQ Section - Nova seção adicionada logo após o Pipeline */}
        <FaqSection />

        {/* Features Section - Enhanced with card hover effects */}
        <section className="features-section enhanced">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Por que negociar na MilesExchange?</h2>
              <p className="section-description">
                Nossa plataforma oferece a maneira mais eficiente e transparente de comprar e vender milhas aéreas.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card hover-lift">
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

              <div className="feature-card hover-lift">
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

              <div className="feature-card hover-lift">
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

        {/* Testimonials - Enhanced with better cards */}
        <section className="testimonials-section enhanced">
          <div className="testimonial-background">
            <div className="testimonial-shape"></div>
          </div>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">O que nossos usuários dizem</h2>
              <p className="section-description">
                Milhares de pessoas já estão aproveitando as vantagens da MilesExchange
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card enhanced">
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
                <div className="testimonial-rating">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <div className="testimonial-card enhanced">
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
                <div className="testimonial-rating">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <div className="testimonial-card enhanced">
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
                <div className="testimonial-rating">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with gradient background */}
        <section className="cta-section enhanced">
          <div className="cta-background"></div>
          <div className="container">
            <div className="cta-grid">
              <div className="cta-content">
                <h2 className="cta-title">Pronto para começar a negociar?</h2>
                <p className="cta-description">
                  Junte-se a milhares de usuários e comece a maximizar o valor das suas milhas hoje mesmo.
                </p>
              </div>
              <div className="cta-buttons">
                <button
                  className="btn btn-secondary btn-lg hover-effect"
                  onClick={() => handleNavigation("/processo-detalhado")}
                >
                  Saiba mais
                </button>
                <button className="btn btn-white btn-lg pulse" onClick={() => handleNavigation("/ofertas")}>
                  Criar conta grátis
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Simplified */}
      <footer className="footer enhanced">
        <div className="container">
          <div className="footer-simple">
            <div className="footer-logo">
              <svg
                viewBox="0 0 24 24"
                width="30"
                height="30"
                stroke="#0062ff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logo-icon"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="logo-text">MilesExchange</span>
            </div>
            <p className="footer-description">
              A primeira bolsa de valores de milhas do Brasil. Negocie com segurança e transparência.
            </p>
          </div>
          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} MilesExchange. Todos os direitos reservados.</p>
            <div className="social-links">
              <a href="#" className="social-link hover-effect">
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
              <a href="#" className="social-link hover-effect">
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
              <a href="#" className="social-link hover-effect">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

