import react, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ModalChoice = () => {
  const { usuario } = useAuth(); //obter o usuário logado do contexto
  const [itsOpen, setIsOpen ] = useState(false); //estado para controlar se o modal está aberto ou fechado
  const navigate = useNavigate(); //navegação programática

  useEffect(() =>{
    if(usuario) {
      setIsOpen(true);// Vai abrir o modal assim que o usuário estiver logado
      return (
        <div>
          {itsOpen && (
            <div className="modal">
              <button onClick={() => handleChoice("Vendedor")}>Vendedor</button>
              <button onClick={() => handleChoice("Comprador")}>Comprador</button>
            </div>
          )}
        </div>
      );
    }
  }, [usuario]);

  const handleChoice = (choice) => {
    setIsOpen(false); //fecha o modal ao escolher uma opção
    if(choice === "Vendedor") {
      navigate("/criar-oferta"); //navega para a página de ofertas
    }
if(choice === "Comprador") {
  navigate("/ofertas"); //navega para a página de ofertas
}
  };

  if (!itsOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">O que você deseja fazer na nossa plataforma?</h2>
        <div className="flex gap-4">
          <button onClick={() => handleChoice("vendedor")} className="btn btn-primary">Eu quero vender minhas milhas</button>
          <button onClick={() => handleChoice("comprador")} className="btn btn-outline-primary">Eu quero comprar milhas</button>
        </div>
      </div>
    </div>
  )
}; 

export default ModalChoice;
