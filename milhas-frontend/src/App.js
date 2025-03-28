import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/pages/AuthContext" // Importa o AuthProvider
import Menu from "./menu.js" // Barra de navegação
import "bootstrap/dist/css/bootstrap.min.css"
import OfertasMilhas from "./components/pages/OfertasMilhas.js" // Página de Ofertas de Milhas
import Confirmacao from "./components/pages/Confirmacao.js" // Nova página de confirmação de oferta
import NegociacoesDetalhes from "./components/pages/NegociacaoDetalhe.js"
import NegociacoesUsuario from "./components/pages/Negociacoes.js"
import Login from "./components/pages/Login.js"
import PrivateRoute from "./components/pages/PrivateRoute" // Importa o componente de rota privada
import Logout from "./components/pages/Logout.js" // Importa o componente de rota privada
import CriarOferta from "./components/pages/CriaOferta.js" // Importa o componente de rota privada
import CriaUsuario from "./components/pages/CriaUsuario.js" // Importa o componente de rota privada
import ReservaLimite from "./components/pages/ReservaLimite.js" // Importa o componente de rota privada
import Home from "./components/pages/Home.js"
import Contato from "./components/pages/Contato.js"
import Pipeline from "./components/pages/PipelineSection.js"
import Processo from "./components/pages/ProcessoDetalhado.js"
import PerfilUsuario from "./components/pages/PerfilUsuario.js" // Nova página de perfil do usuário
import Avaliacao from "./components/pages/Avaliacao"
import FaqPage from "./components/pages/faq/page.js" // Importando a página de FAQ

// Add the new imports for the payment status pages
import PaymentSuccess from "./components/pages/PaymentSuccess"
import PaymentFailure from "./components/pages/PaymentFailure"
import PaymentPending from "./components/pages/PaymentPending"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu /> {/* Barra de navegação fixa */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ofertas" element={<OfertasMilhas />} /> {/* Página de Ofertas de Milhas */}
          <Route path="/confirmacao/:ofertaId" element={<Confirmacao />} />
          <Route path="/login" element={<Login />} /> {/* Rota de Login */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/criar-oferta" element={<PrivateRoute element={<CriarOferta />} />} />
          <Route path="/negociacoes/:id" element={<PrivateRoute element={<NegociacoesDetalhes />} />} />
          <Route path="/negociacoes/usuario/:usuarioId" element={<PrivateRoute element={<NegociacoesUsuario />} />} />
          <Route path="/perfil/:id" element={<PrivateRoute element={<PerfilUsuario />} />} />
          <Route path="/cadastro" element={<CriaUsuario />} />
          <Route path="/reserva" element={<ReservaLimite />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/pipeline-section" element={<Pipeline />} />
          <Route path="/processo-detalhado" element={<Processo />} />
          <Route path="/avaliacao/:negociacaoId/:usuarioId" element={<Avaliacao />} />
          <Route path="/faq" element={<FaqPage />} /> {/* Adicionando a rota para a página de FAQ */}
          {/* Add the new routes inside the Routes component */}
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/pending" element={<PaymentPending />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

