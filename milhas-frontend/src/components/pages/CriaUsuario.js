import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setFeedback("As senhas não coincidem.");
      setSucesso("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/usuarios/cadastrar",
        {
          nome,
          email,
          senha,
        }
      );

      if (response.status === 201) {
        setSucesso(
          "Cadastro realizado com sucesso! Você pode fazer login agora."
        );
        setFeedback(""); // Limpar qualquer mensagem de erro anterior
        setTimeout(() => {
          navigate("/login"); // Redireciona para a página de login após o sucesso
        }, 2000);
      }
    } catch (error) {
      setFeedback("Erro ao cadastrar. Tente novamente.");
      setSucesso("");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      {feedback && <div className="alert alert-danger">{feedback}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <form onSubmit={handleCadastro}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmarSenha" className="form-label">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmarSenha"
            className="form-control"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
