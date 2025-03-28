import { Link } from "react-router-dom"
import "../css/PaymentStatus.css"

const PaymentSuccess = () => {
  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-icon success">
          {/* Simple checkmark using Unicode */}
          <span className="icon-symbol">✓</span>
        </div>
        <h1 className="status-title">Pagamento Confirmado!</h1>
        <p className="status-message">
          Seu pagamento foi processado com sucesso. Você receberá um e-mail com os detalhes da transação.
        </p>
        <div className="status-details">
          <p>Obrigado por negociar conosco.</p>
        </div>
        <Link to="/" className="status-button">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess

