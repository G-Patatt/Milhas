import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/VerificaEmail.css";

const VerificaEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("validando");
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_BASE || "http://localhost:5001"; // backend local

  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await axios.get(`${API}/api/usuarios/verificar-email/${token}`);
  
        const usuarioId = res.data.usuarioId;
        console.log("Usuário verificado, ID:", usuarioId);
  
        // Faz segunda verificação (recomendado)
        const resConfirmacao = await axios.get(`${API}/api/usuarios/${usuarioId}`);
        if (resConfirmacao.data.email_verificado === true) {
          setStatus("sucesso");
        } else {
          setStatus("erro"); // algo falhou
        }
  
      } catch (error) {
        console.error("Erro ao verificar e-mail:", error.response?.data);
        setStatus("erro");
      }
    };
  
    if (token) verificar();
  }, [token]);

  const irParaLogin = () => {
    navigate("/login");
  };

  const irParaHome = () => {
    navigate("/");
  };

  return (
    <div className="verifica-email-page">
      <div className="verifica-email-container">
        <div className="verifica-email-card">
          <div className="verifica-email-header">
            <div className="verifica-email-icon">
              {status === "validando" && <div className="loading-spinner"></div>}
              {status === "sucesso" && <div className="success-icon">✓</div>}
              {status === "erro" && <div className="error-icon">!</div>}
            </div>
            <h1 className="verifica-email-title">
              {status === "validando" && "Verificando seu e-mail"}
              {status === "sucesso" && "E-mail verificado!"}
              {status === "erro" && "Verificação falhou"}
            </h1>
          </div>

          <div className="verifica-email-content">
            {status === "validando" && (
              <div className="verifica-email-message">
                <p>Estamos validando seu e-mail...</p>
                <p className="verifica-email-subtitle">Isso levará apenas alguns segundos.</p>
              </div>
            )}

            {status === "sucesso" && (
              <div className="verifica-email-message">
                <p>Seu e-mail foi verificado com sucesso!</p>
                <p className="verifica-email-subtitle">Sua conta está ativa e você já pode acessar todos os recursos da plataforma.</p>
                <div className="confetti-container">
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                </div>
              </div>
            )}

            {status === "erro" && (
              <div className="verifica-email-message">
                <p>Não foi possível verificar seu e-mail.</p>
                <p className="verifica-email-subtitle">O link pode ser inválido ou ter expirado. Por favor, tente novamente ou entre em contato com o suporte.</p>
              </div>
            )}
          </div>

          <div className="verifica-email-actions">
            {status === "sucesso" && (
              <button className="verifica-email-button primary-button" onClick={irParaLogin}>
                Fazer login
              </button>
            )}
            
            {status === "erro" && (
              <button className="verifica-email-button primary-button" onClick={irParaHome}>
                Voltar para o início
              </button>
            )}
            
            <button className="verifica-email-button secondary-button" onClick={irParaHome}>
              Página inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificaEmail;
