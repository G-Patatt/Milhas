import React from 'react';
import { useAuth } from './AuthContext'; // Acessa o AuthContext
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth(); // Chama a função logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpa o estado e o token
    localStorage.removeItem('usuarioId'); // Remove o ID do usuário
    localStorage.removeItem('token'); // Remove o token de autenticação, se houver
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default Logout;
