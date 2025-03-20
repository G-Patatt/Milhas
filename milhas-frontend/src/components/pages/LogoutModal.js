import React from "react"
import "../css/Logout.css" // Reutilizando os estilos existentes

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <div className="logout-modal-header">
          <h3>Confirmar Logout</h3>
          <button className="close-button" onClick={onCancel} aria-label="Fechar">
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="logout-modal-body">
          <p>Tem certeza que deseja sair da sua conta?</p>
        </div>
        <div className="logout-modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>
            Não, continuar navegando
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Sim, quero sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
