import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const login = (usuario) => {
    setUsuario(usuario);
  };

  const logout = () => {
    setUsuario(null);
    setMostrarModal(false); //Set para GARANTIR que o modal não seha exibido após o logout
    localStorage.removeItem('token'); // Limpar o token do localStorage
  };

  const finalizarCadastro = (usuario) => {
    setUsuario(usuario);
    setMostrarModal(true); //Set para GARANTIR que o modal seja exibido após o cadastro
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, mostrarModal,  finalizarCadastro }}>
      {children}
    </AuthContext.Provider>
  );
};
