import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Acessa o AuthContext
import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';

function Logout() {
  const { logout } = useAuth(); // Chama a função logout
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true); // Abre o modal de confirmação
  };

  const handleConfirmLogout = () => {
    logout(); // Limpa o estado e o token
    localStorage.removeItem('usuario'); // Remove o ID do usuário
    localStorage.removeItem('token'); // Remove o token de autenticação, se houver
    navigate('/login'); // Redireciona para a página de login
    setShowModal(false); // Fecha o modal
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Fecha o modal
    navigate('/ofertas'); // Redireciona para a página de ofertas
  };

  return (
    <>
      <button onClick={handleLogoutClick} className="logout-button">
        <i className="fa fa-sign-out"></i>
        <span>Logout</span>
      </button>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <div className="logout-modal-header">
              <h3>Confirmar Logout</h3>
              <button 
                className="close-button" 
                onClick={handleCancelLogout}
                aria-label="Fechar"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="logout-modal-body">
              <p>Tem certeza que deseja sair da sua conta?</p>
            </div>
            <div className="logout-modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={handleCancelLogout}
              >
                Não, continuar navegando
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleConfirmLogout}
              >
                Sim, quero sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
