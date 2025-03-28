import { Link } from "react-router-dom"
import "../css/PaymentStatus.css"

const PaymentFailure = () => {
  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-icon failure">
          {/* Simple X mark using Unicode */}
          <span className="icon-symbol">✕</span>
        </div>
        <h1 className="status-title">Pagamento Não Concluído</h1>
        <p className="status-message">Infelizmente, houve um problema ao processar seu pagamento.</p>
        <div className="status-details">
          <p>Verifique os dados do seu cartão ou tente outro método de pagamento.</p>
        </div>
        <div className="status-actions">
          <Link to="/" className="status-button secondary">
            Voltar para a página inicial
          </Link>
          <Link to="/ofertas" className="status-button">
            Tentar novamente
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure

