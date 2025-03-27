"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "../css/Login.css";

// Componente para o botão de login no menu
export function LoginButton() {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <a href="#" onClick={handleLoginClick} className="auth-button">
      <i className="fa fa-sign-in"></i>
      <span>Login</span>
    </a>
  );
}

// Componente principal de login
function Login() {
  const auth = useAuth();
  const { login } = auth;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    try {
      console.log("Enviando dados de login:", { email, senha });

      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        // Após o login bem-sucedido
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        localStorage.setItem("token", response.data.token); // Armazena o token no localStorage
        login(response.data.usuario); // Atualiza o estado do contexto
        navigate("/"); // Redireciona para a página principal
      }
    } catch (error) {
      setFeedback("Erro ao fazer login. Verifique suas credenciais.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="login-subtitle">
            Entre para negociar milhas e aproveitar as melhores ofertas
          </p>
        </div>

        {feedback && <div className="login-alert">{feedback}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i>
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <i className="fa fa-sign-in"></i>
                  <span>Entrar</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>Ainda não tem uma conta?</p>
          <a href="/cadastro" className="register-link">
            Cadastre-se agora
            <i className="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
