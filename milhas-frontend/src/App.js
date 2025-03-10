import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/pages/AuthContext'; // Importa o AuthProvider
import Menu from './menu.js'; // Barra de navegação
import 'bootstrap/dist/css/bootstrap.min.css';
import OfertasMilhas from './components/pages/OfertasMilhas.js'; // Página de Ofertas de Milhas
import Confirmacao from './components/pages/Confirmacao.js'; // Nova página de confirmação de oferta
import NegociacoesDetalhes from './components/pages/NegociacaoDetalhe.js';
import NegociacoesUsuario from './components/pages/Negociacoes.js';
import Login from './components/pages/Login.js';
import PrivateRoute from './components/pages/PrivateRoute'; // Importa o componente de rota privada
import Logout from './components/pages/Logout.js'; // Importa o componente de rota privada
import CriarOferta from './components/pages/CriaOferta.js'; // Importa o componente de rota privada
import CriaUsuario from './components/pages/CriaUsuario.js'; // Importa o componente de rota privada
import GuiaUsuarioPage from './components/pages/GuiaUsuarioPage.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu /> {/* Barra de navegação fixa */}
        <Routes> 
          <Route path="/" element={<h1>Bem-vindo ao Sistema de Milhas!</h1>} />
          <Route path='/guia-usuario' element={<GuiaUsuarioPage />} />
          <Route path="/ofertas" element={<OfertasMilhas />} /> {/* Página de Ofertas de Milhas */}
          <Route path="/confirmacao/:ofertaId" element={<Confirmacao />} />
          <Route path="/login" element={<Login />} /> {/* Rota de Login */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/criar-oferta" element={<PrivateRoute element={<CriarOferta />} />} />
          <Route
            path="/negociacoes/:id"
            element={<PrivateRoute element={<NegociacoesDetalhes />} />}
          />
          <Route
            path="/negociacoes/usuario/:usuarioId"
            element={<PrivateRoute element={<NegociacoesUsuario />} />}
          />
          <Route path="/cadastro" element={<CriaUsuario />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
