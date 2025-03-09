  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from './AuthContext'; // Importa corretamente o AuthContext
  import axios from 'axios';

  function Login() {
    const auth = useAuth();
    console.log(auth); // Verifique se está retornando { login, logout, usuario }
    const { login } = auth; // Acessa a função de login do contexto
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [feedback, setFeedback] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando dados de login:', { email, senha });

      const response = await axios.post('http://localhost:5000/api/login', { email, senha });

      if (response.status === 200) {
        // Após o login bem-sucedido
        localStorage.setItem('usuarioId', response.data.usuario.id);
        console.log('Token:', response.data.token);
        localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
        login(response.data.usuario); // Atualiza o estado do contexto
        navigate('/'); // Redireciona para a página principal
      }
    } catch (error) {
      setFeedback('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

    
    
    

    return (
      <div className="container mt-5">
        <h2>Login</h2>
        {feedback && <div className="alert alert-danger">{feedback}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Entrar</button>
          <a href="/cadastro" target="_blank" rel="noopener noreferrer"        style={{ padding: '10px 20px' }}>
            Cadastre-se aqui
          </a>

        </form>

      </div>
    );
  }

  export default Login;
