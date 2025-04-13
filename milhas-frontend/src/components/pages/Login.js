"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "./AuthContext"
import axios from "axios"
import "../css/Login.css"
const API = process.env.REACT_APP_API_BASE

// Componente para o botão de login no menu
export function LoginButton() {
  const navigate = useNavigate()

  const handleLoginClick = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <a href="#" onClick={handleLoginClick} className="auth-button">
      <i className="fa fa-sign-in"></i>
      <span>Login</span>
    </a>
  )
}

// Componente principal de login
function Login() {
  const auth = useAuth()
  const { login } = auth
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback("")

    try {
      console.log("Enviando dados de login:", { email, senha })

      const response = await axios.post(`${API}/api/login`, {
        email,
        senha,
      })

      if (response.status === 200) {
        // Após o login bem-sucedido
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario))
        localStorage.setItem("token", response.data.token) // Armazena o token no localStorage
        login(response.data.usuario) // Atualiza o estado do contexto
        navigate("/") // Redireciona para a página principal
      }
    } catch (error) {
      setFeedback("Erro ao fazer login. Verifique suas credenciais.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
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
          <h2>Acesse sua conta</h2>
          <p className="login-subtitle">Entre para negociar milhas e aproveitar as melhores ofertas</p>
        </div>

        {feedback && (
          <div className="alert alert-danger mx-4 mb-3" role="alert">
            <i className="fa fa-exclamation-circle me-2"></i>
            {feedback}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
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
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <div className="d-flex justify-content-end mt-2">
              <Link to="/esqueci-senha" className="text-primary small">
                Esqueci minha senha
              </Link>
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
                "Entrar"
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>Ainda não tem uma conta?</p>
          <Link to="/cadastro" className="register-link">
            Cadastre-se agora
            <i className="fa fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
