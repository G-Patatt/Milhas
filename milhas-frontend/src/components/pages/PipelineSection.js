"use client"
import "../css/PipelineSection.css"
import { Link } from "react-router-dom"

function PipelineSection() {
  return (
    <section className="pipeline-section">
      <div className="container">
        <div className="pipeline-header">
          <h2>Como funciona a negociação de milhas</h2>
          <p>Entenda o processo completo de uma negociação segura na MilesExchange</p>
        </div>

        <div className="pipeline-container">
          {/* Etapa 1 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">1</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-user-plus"></i>
              </div>
              <h3>Cadastro</h3>
              <p>Crie sua conta para comprar ou vender milhas na plataforma</p>
            </div>
          </div>

          {/* Seta */}
          <div className="pipeline-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </div>

          {/* Etapa 2 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">2</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-edit"></i>
              </div>
              <h3>Criar ou Buscar Oferta</h3>
              <p>Cadastre sua oferta com origem, destino, cia aérea e valor ou encontre ofertas disponíveis</p>
            </div>
          </div>

          {/* Seta */}
          <div className="pipeline-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </div>

          {/* Etapa 3 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">3</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-handshake-o"></i>
              </div>
              <h3>Iniciar Negociação</h3>
              <p>Comprador e vendedor iniciam uma negociação quando há interesse mútuo</p>
            </div>
          </div>

          {/* Seta */}
          <div className="pipeline-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </div>

          {/* Etapa 4 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">4</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-shield"></i>
              </div>
              <h3>Alocar Garantias</h3>
              <p>Ambas as partes alocam garantias para proteger a transação contra fraudes</p>
            </div>
          </div>

          {/* Seta */}
          <div className="pipeline-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </div>

          {/* Etapa 5 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">5</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-plane"></i>
              </div>
              <h3>Emissão da Passagem</h3>
              <p>O vendedor emite a passagem no nome do comprador usando suas milhas</p>
            </div>
          </div>

          {/* Seta */}
          <div className="pipeline-arrow">
            <i className="fa fa-long-arrow-right"></i>
          </div>

          {/* Etapa 6 */}
          <div className="pipeline-step">
            <div className="pipeline-step-number">6</div>
            <div className="pipeline-step-content">
              <div className="pipeline-icon">
                <i className="fa fa-check-circle"></i>
              </div>
              <h3>Confirmação e Pagamento</h3>
              <p>Comprador confirma a emissão, garantias são devolvidas e o pagamento é transferido ao vendedor</p>
            </div>
          </div>
        </div>

        <div className="pipeline-footer">
          <div className="pipeline-security-badge">
            <i className="fa fa-lock"></i>
            <span>Todas as transações são protegidas por garantias de ambas as partes</span>
          </div>
          <div className="pipeline-more-info">
            <Link to="/processo-detalhado" className="btn-entenda-processo">
              Entenda o processo em detalhes
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
                className="ml-2 inline"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PipelineSection

