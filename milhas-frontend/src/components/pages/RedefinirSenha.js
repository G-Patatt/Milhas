"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import "../css/RedefinirSenha.css";
import axios from "axios";
const API = process.env.REACT_APP_API_BASE


function RedefinirSenha() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    novaSenha: "",
    confirmarSenha: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: "", message: "" })
  const [tokenValido, setTokenValido] = useState(true)
  const [redefinicaoConcluida, setRedefinicaoConcluida] = useState(false)

  // Adicionar um novo estado para a força da senha
  const [forcaSenha, setForcaSenha] = useState({
    valor: 0, // 0-100
    texto: "Fraca",
    classe: "fraca",
  })

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await axios.get(`${API}/api/usuarios/verificar-token-redefinicao/${token}`);
        if (!response.data?.valido) {
          setTokenValido(false)
          setFeedback({
            type: "error",
            message: "O link de redefinição de senha é inválido ou expirou.",
          })
        } else {
          setTokenValido(true)
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error)
        setTokenValido(false)
        setFeedback({
          type: "error",
          message: "O link de redefinição de senha é inválido ou expirou.",
        })
      }
    }
  
    verificarToken()
  }, [token])
  
  // Modificar a função handleChange para calcular a força da senha quando o campo novaSenha for alterado
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Calcular a força da senha quando o campo novaSenha for alterado
    if (name === "novaSenha") {
      calcularForcaSenha(value)
    }
  }

  // Adicionar a função para calcular a força da senha
  const calcularForcaSenha = (senha) => {
    // Iniciar com pontuação zero
    let pontuacao = 0
    let feedback = { valor: 0, texto: "Fraca", classe: "fraca" }

    // Verificar comprimento mínimo (8 caracteres)
    if (senha.length >= 8) {
      pontuacao += 20
    }

    // Verificar quantidade de números (2 ou mais)
    const numeros = senha.replace(/[^0-9]/g, "")
    if (numeros.length >= 4) {
      pontuacao += 30
    } else if (numeros.length >= 2) {
      pontuacao += 15
    }

    // Verificar quantidade de letras (6 ou mais)
    const letras = senha.replace(/[^a-zA-Z]/g, "")
    if (letras.length >= 8) {
      pontuacao += 30
    } else if (letras.length >= 6) {
      pontuacao += 20
    }

    // Verificar se tem letras maiúsculas e minúsculas
    if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) {
      pontuacao += 20
    }

    // Definir texto e classe com base na pontuação
    if (pontuacao >= 80) {
      feedback = { valor: pontuacao, texto: "Forte", classe: "forte" }
    } else if (pontuacao >= 50) {
      feedback = { valor: pontuacao, texto: "Média", classe: "media" }
    } else {
      feedback = { valor: pontuacao, texto: "Fraca", classe: "fraca" }
    }

    setForcaSenha(feedback)
  }

  // Validar complexidade da senha
  const validarSenha = (senha) => {
    // Verificar se tem pelo menos 8 caracteres no total
    if (senha.length < 8) {
      return { valido: false, mensagem: "A senha deve ter pelo menos 8 caracteres." }
    }

    // Verificar se tem pelo menos 2 números
    const numeros = senha.replace(/[^0-9]/g, "")
    if (numeros.length < 2) {
      return { valido: false, mensagem: "A senha deve conter pelo menos 2 números." }
    }

    // Verificar se tem pelo menos 6 letras
    const letras = senha.replace(/[^a-zA-Z]/g, "")
    if (letras.length < 6) {
      return { valido: false, mensagem: "A senha deve conter pelo menos 6 letras." }
    }

    return { valido: true, mensagem: "" }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar se as senhas coincidem
    if (formData.novaSenha !== formData.confirmarSenha) {
      setFeedback({
        type: "error",
        message: "As senhas não coincidem. Por favor, verifique.",
      })
      return
    }

    // Validar complexidade da senha
    const validacaoSenha = validarSenha(formData.novaSenha)
    if (!validacaoSenha.valido) {
      setFeedback({
        type: "error",
        message: validacaoSenha.mensagem,
      })
      return
    }

    setIsLoading(true)
    setFeedback({ type: "", message: "" })

    try {
      // Em um ambiente real, você faria uma chamada à API para redefinir a senha
      await axios.post(`${API}/api/usuarios/redefinir-senha`, { token, novaSenha: formData.novaSenha })

      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulando sucesso
      setRedefinicaoConcluida(true)
      setFeedback({
        type: "success",
        message: "Sua senha foi redefinida com sucesso!",
      })

      // Redirecionar para a página de login após 3 segundos
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      setFeedback({
        type: "error",
        message: "Não foi possível redefinir sua senha. Tente novamente mais tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!tokenValido) {
    return (
      <div className="redefinir-senha-container">
        <div className="redefinir-senha-card">
          <div className="redefinir-senha-header">
            <div className="redefinir-senha-logo">
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
            <h2>Link Inválido</h2>
          </div>

          <div className="redefinir-senha-error-container">
            <div className="redefinir-senha-error-icon">
              <i className="fa fa-exclamation-triangle"></i>
            </div>
            <p>{feedback.message}</p>
            <p className="redefinir-senha-error-help">Por favor, solicite um novo link de redefinição de senha.</p>
          </div>

          <div className="redefinir-senha-footer">
            <div className="links-container">
              <Link to="/esqueci-senha" className="btn-solicitar-novo">
                Solicitar novo link
              </Link>
              <Link to="/login" className="back-to-login">
                Voltar para o Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (redefinicaoConcluida) {
    return (
      <div className="redefinir-senha-container">
        <div className="redefinir-senha-card">
          <div className="redefinir-senha-header">
            <div className="redefinir-senha-logo">
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
            <h2>Senha Redefinida</h2>
          </div>

          <div className="redefinir-senha-success-container">
            <div className="redefinir-senha-success-icon">
              <i className="fa fa-check-circle"></i>
            </div>
            <h3>Senha alterada com sucesso!</h3>
            <p>Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login em instantes.</p>
          </div>

          <div className="redefinir-senha-footer">
            <Link to="/login" className="btn-ir-para-login">
              Ir para o Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="redefinir-senha-container">
      <div className="redefinir-senha-card">
        <div className="redefinir-senha-header">
          <div className="redefinir-senha-logo">
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
          <h2>Redefinir Senha</h2>
          <p className="redefinir-senha-subtitle">Crie uma nova senha para sua conta</p>
        </div>

        {feedback.message && (
          <div
            className={`alert ${feedback.type === "success" ? "alert-success" : "alert-danger"} mx-4 mb-3`}
            role="alert"
          >
            <i className={`fa ${feedback.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} me-2`}></i>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="redefinir-senha-form">
          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label">
              Nova Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="novaSenha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              placeholder="Digite sua nova senha"
              required
            />
            <div className="form-text text-muted small mt-1">
              A senha deve ter pelo menos 8 caracteres, incluindo 2 números e 6 letras.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label">
              Confirmar Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua nova senha"
              required
            />
          </div>

          {/* Barra de força de senha */}
          <div className="senha-forca-container mb-3">
            <div className="senha-forca-barra">
              <div
                className="senha-forca-progresso"
                style={{
                  width: `${forcaSenha.valor}%`,
                  backgroundColor:
                    forcaSenha.classe === "fraca" ? "#ef4444" : forcaSenha.classe === "media" ? "#f59e0b" : "#10b981",
                }}
              ></div>
            </div>
            <div className="senha-forca-texto-container">
              <span
                style={{
                  color:
                    forcaSenha.classe === "fraca" ? "#ef4444" : forcaSenha.classe === "media" ? "#f59e0b" : "#10b981",
                }}
              >
                {forcaSenha.texto}
              </span>
            </div>
          </div>

          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processando...
                </>
              ) : (
                "Redefinir Senha"
              )}
            </button>
          </div>
        </form>

        <div className="redefinir-senha-footer">
          <Link to="/login" className="back-to-login">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RedefinirSenha
