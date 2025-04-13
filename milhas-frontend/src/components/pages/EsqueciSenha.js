"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/EsqueciSenha.css"
import axios from "axios"
const API = process.env.REACT_APP_API_BASE

function EsqueciSenha() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1) // 1: formulário de email, 2: confirmação enviada
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: "", message: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback({ type: "", message: "" })

    try {
      // Simulação de chamada à API
      // Em um ambiente real, você faria uma chamada à API para enviar o email de redefinição
      await axios.post(`${API}/api/usuarios/recuperar-senha`, { email });


      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Avançar para o próximo passo
      setStep(2)
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error)
      setFeedback({
        type: "error",
        message: "Não foi possível enviar o email de redefinição. Tente novamente mais tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="esqueci-senha-container">
      <div className="esqueci-senha-card">
        <div className="esqueci-senha-header">
          <div className="esqueci-senha-logo">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h1>MilesExchange</h1>
          </div>
          <h2>Recuperação de Senha</h2>
          <p className="esqueci-senha-subtitle">
            {step === 1
              ? "Informe seu email para receber instruções de recuperação"
              : "Verifique seu email para redefinir sua senha"}
          </p>
        </div>

        {feedback.message && (
          <div className={`alert ${feedback.type === "error" ? "alert-danger" : "alert-success"}`} role="alert">
            {feedback.message}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="esqueci-senha-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Endereço de Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email cadastrado"
                required
              />
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processando...
                  </>
                ) : (
                  "Enviar Instruções"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="esqueci-senha-confirmation text-center p-4">
            <div className="confirmation-icon">
              <i className="fa fa-envelope-o fa-3x text-primary mb-3"></i>
            </div>
            <h3 className="mb-3">Email Enviado!</h3>
            <p>
              Enviamos um email para <strong>{email}</strong> com instruções para redefinir sua senha.
            </p>
            <p className="text-muted fst-italic small mt-3">
              Se você não receber o email em alguns minutos, verifique sua pasta de spam ou lixo eletrônico.
            </p>
          </div>
        )}

        <div className="esqueci-senha-footer">
          <Link to="/login" className="back-to-login">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EsqueciSenha
