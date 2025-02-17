import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  if (!token || token === "undefined") {
    // Se o token não existir, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o token existir, renderiza o componente solicitado
  return element;
}

export default PrivateRoute;
