"use client"
import { Link } from "react-router-dom"
import "../css/PaymentStatus.css"

const PaymentPending = () => {
  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-icon pending">
          {/* Simple hourglass using Unicode */}
          <span className="icon-symbol">⌛</span>
        </div>
        <h1 className="status-title">Pagamento em Processamento</h1>
        <p className="status-message">Seu pagamento está sendo processado. Isso pode levar alguns minutos.</p>
        <div className="status-details">
          <p>Você receberá uma notificação assim que o pagamento for confirmado.</p>
          <p>Por favor, não feche esta página.</p>
        </div>
        <div className="status-actions">
          <Link to="/" className="status-button secondary">
            Voltar para a página inicial
          </Link>
          <button className="status-button" onClick={() => window.location.reload()}>
            Verificar status
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentPending

