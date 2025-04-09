"use client"
import { useLocation, useNavigate } from "react-router-dom"
import "../css/CadastroSucesso.css"

const CadastroSucesso = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { email = "", nome = "" } = location.state || {}

  // Redireciona para a página inicial se não houver email (acesso direto à página)
  if (!email) {
    navigate("/")
    return null
  }

  return (
    <div className="cadastro-sucesso-container">
      <div className="cadastro-sucesso-card">
        <div className="cadastro-sucesso-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 className="cadastro-sucesso-titulo">Cadastro realizado com sucesso!</h1>

        <div className="cadastro-sucesso-mensagem">
          <p>
            Olá <strong>{nome}</strong>, enviamos um e-mail de confirmação para:
          </p>
          <p className="cadastro-sucesso-email">{email}</p>
          <p>Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.</p>
        </div>

        <div className="cadastro-sucesso-dicas">
          <h3>Não recebeu o e-mail?</h3>
          <ul>
            <li>Verifique sua pasta de spam ou lixo eletrônico</li>
            <li>Certifique-se de que o endereço de e-mail foi digitado corretamente</li>
            <li>Aguarde alguns minutos, pois o e-mail pode demorar um pouco para chegar</li>
          </ul>
        </div>

        <div className="cadastro-sucesso-botoes">
          <button className="btn-ir-login" onClick={() => navigate("/login")}>
            Ir para o Login
          </button>
          <button className="btn-voltar-home" onClick={() => navigate("/")}>
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  )
}

export default CadastroSucesso
