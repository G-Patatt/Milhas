"use client"

import { useState, useRef } from "react"
import "../css/EnvioComprovanteForm.css"

const EnvioComprovanteForm = ({ onSubmit, isLoading, errorMessage }) => {
  const [codigoReserva, setCodigoReserva] = useState("")
  const [comprovante, setComprovante] = useState(null)
  const [erroFormulario, setErroFormulario] = useState("")
  const fileInputRef = useRef(null)

  // Função para lidar com a mudança do arquivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0])
      setErroFormulario("") // Limpar erro quando um arquivo é selecionado
    }
  }

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação básica
    if (!codigoReserva.trim()) {
      setErroFormulario("O código da reserva é obrigatório")
      return
    }

    if (!comprovante) {
      setErroFormulario("O comprovante é obrigatório")
      return
    }

    // Chamar a função de callback com os dados do formulário
    onSubmit({ codigoReserva, comprovante })
  }

  return (
    <form onSubmit={handleSubmit} className="envio-comprovante-form">
      {erroFormulario && (
        <div className="envio-comprovante-form-error">
          <i className="fa fa-exclamation-circle icon-margin-right"></i>
          {erroFormulario}
        </div>
      )}

      {errorMessage && (
        <div className="envio-comprovante-form-error">
          <i className="fa fa-exclamation-circle icon-margin-right"></i>
          {errorMessage}
        </div>
      )}

      <div className="envio-comprovante-form-group">
        <label htmlFor="codigoReserva">Código da Reserva Emitida</label>
        <input
          type="text"
          id="codigoReserva"
          value={codigoReserva}
          onChange={(e) => setCodigoReserva(e.target.value)}
          placeholder="Digite o código da reserva"
          required
          disabled={isLoading}
        />
      </div>

      <div className="envio-comprovante-form-group">
        <label htmlFor="comprovante">Comprovante de Pagamento e Passagem</label>
        <input
          type="file"
          id="comprovante"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          required
          disabled={isLoading}
        />
        <small className="envio-comprovante-form-help">Formatos aceitos: PDF, JPG, JPEG, PNG</small>
      </div>

      <div className="envio-comprovante-buttons">
        <button type="submit" className="btn-pagar" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="spinner-small"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <i className="fa fa-paper-plane icon-margin-right"></i>
              Confirmar Envio
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default EnvioComprovanteForm

