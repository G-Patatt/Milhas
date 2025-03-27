"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CriaOferta.css";

// Componente de Autocomplete para aeroportos
const AeroportoAutocomplete = ({ id, label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredAeroportos, setFilteredAeroportos] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Lista de aeroportos principais do Brasil e do mundo
  const aeroportos = [
    // Brasil
    { codigo: "GRU", nome: "São Paulo - Guarulhos (GRU)" },
    { codigo: "CGH", nome: "São Paulo - Congonhas (CGH)" },
    { codigo: "BSB", nome: "Brasília (BSB)" },
    { codigo: "GIG", nome: "Rio de Janeiro - Galeão (GIG)" },
    { codigo: "SDU", nome: "Rio de Janeiro - Santos Dumont (SDU)" },
    { codigo: "CNF", nome: "Belo Horizonte - Confins (CNF)" },
    { codigo: "SSA", nome: "Salvador (SSA)" },
    { codigo: "REC", nome: "Recife (REC)" },
    { codigo: "FOR", nome: "Fortaleza (FOR)" },
    { codigo: "CWB", nome: "Curitiba (CWB)" },
    { codigo: "POA", nome: "Porto Alegre (POA)" },
    { codigo: "VCP", nome: "Campinas - Viracopos (VCP)" },
    { codigo: "FLN", nome: "Florianópolis (FLN)" },
    { codigo: "BEL", nome: "Belém (BEL)" },
    { codigo: "MAO", nome: "Manaus (MAO)" },
    { codigo: "NAT", nome: "Natal (NAT)" },
    { codigo: "MCZ", nome: "Maceió (MCZ)" },
    { codigo: "CGB", nome: "Cuiabá (CGB)" },
    { codigo: "GYN", nome: "Goiânia (GYN)" },

    // América do Norte
    { codigo: "JFK", nome: "Nova York - JFK (JFK)" },
    { codigo: "LGA", nome: "Nova York - LaGuardia (LGA)" },
    { codigo: "EWR", nome: "Nova York - Newark (EWR)" },
    { codigo: "LAX", nome: "Los Angeles (LAX)" },
    { codigo: "SFO", nome: "São Francisco (SFO)" },
    { codigo: "ORD", nome: "Chicago - O'Hare (ORD)" },
    { codigo: "DFW", nome: "Dallas/Fort Worth (DFW)" },
    { codigo: "MIA", nome: "Miami (MIA)" },
    { codigo: "ATL", nome: "Atlanta (ATL)" },
    { codigo: "DEN", nome: "Denver (DEN)" },
    { codigo: "LAS", nome: "Las Vegas (LAS)" },
    { codigo: "SEA", nome: "Seattle (SEA)" },
    { codigo: "BOS", nome: "Boston (BOS)" },
    { codigo: "IAD", nome: "Washington - Dulles (IAD)" },
    { codigo: "DCA", nome: "Washington - Reagan (DCA)" },
    { codigo: "PHX", nome: "Phoenix (PHX)" },
    { codigo: "IAH", nome: "Houston - Intercontinental (IAH)" },
    { codigo: "YYZ", nome: "Toronto (YYZ)" },
    { codigo: "YVR", nome: "Vancouver (YVR)" },
    { codigo: "YUL", nome: "Montreal (YUL)" },
    { codigo: "MEX", nome: "Cidade do México (MEX)" },
    { codigo: "CUN", nome: "Cancún (CUN)" },

    // Europa
    { codigo: "LHR", nome: "Londres - Heathrow (LHR)" },
    { codigo: "LGW", nome: "Londres - Gatwick (LGW)" },
    { codigo: "CDG", nome: "Paris - Charles de Gaulle (CDG)" },
    { codigo: "ORY", nome: "Paris - Orly (ORY)" },
    { codigo: "FRA", nome: "Frankfurt (FRA)" },
    { codigo: "AMS", nome: "Amsterdã (AMS)" },
    { codigo: "MAD", nome: "Madri (MAD)" },
    { codigo: "BCN", nome: "Barcelona (BCN)" },
    { codigo: "FCO", nome: "Roma - Fiumicino (FCO)" },
    { codigo: "MXP", nome: "Milão - Malpensa (MXP)" },
    { codigo: "LIN", nome: "Milão - Linate (LIN)" },
    { codigo: "MUC", nome: "Munique (MUC)" },
    { codigo: "ZRH", nome: "Zurique (ZRH)" },
    { codigo: "GVA", nome: "Genebra (GVA)" },
    { codigo: "VIE", nome: "Viena (VIE)" },
    { codigo: "BRU", nome: "Bruxelas (BRU)" },
    { codigo: "CPH", nome: "Copenhague (CPH)" },
    { codigo: "ARN", nome: "Estocolmo - Arlanda (ARN)" },
    { codigo: "OSL", nome: "Oslo (OSL)" },
    { codigo: "HEL", nome: "Helsinque (HEL)" },
    { codigo: "ATH", nome: "Atenas (ATH)" },
    { codigo: "IST", nome: "Istambul (IST)" },
    { codigo: "DME", nome: "Moscou - Domodedovo (DME)" },
    { codigo: "SVO", nome: "Moscou - Sheremetyevo (SVO)" },
    { codigo: "LED", nome: "São Petersburgo (LED)" },
    { codigo: "LIS", nome: "Lisboa (LIS)" },
    { codigo: "OPO", nome: "Porto (OPO)" },
    { codigo: "DUB", nome: "Dublin (DUB)" },
    { codigo: "PRG", nome: "Praga (PRG)" },
    { codigo: "WAW", nome: "Varsóvia (WAW)" },
    { codigo: "BUD", nome: "Budapeste (BUD)" },

    // Ásia
    { codigo: "HND", nome: "Tóquio - Haneda (HND)" },
    { codigo: "NRT", nome: "Tóquio - Narita (NRT)" },
    { codigo: "PEK", nome: "Pequim - Capital (PEK)" },
    { codigo: "PKX", nome: "Pequim - Daxing (PKX)" },
    { codigo: "PVG", nome: "Xangai - Pudong (PVG)" },
    { codigo: "SHA", nome: "Xangai - Hongqiao (SHA)" },
    { codigo: "HKG", nome: "Hong Kong (HKG)" },
    { codigo: "ICN", nome: "Seul - Incheon (ICN)" },
    { codigo: "GMP", nome: "Seul - Gimpo (GMP)" },
    { codigo: "SIN", nome: "Singapura (SIN)" },
    { codigo: "BKK", nome: "Bangkok (BKK)" },
    { codigo: "KUL", nome: "Kuala Lumpur (KUL)" },
    { codigo: "CGK", nome: "Jacarta (CGK)" },
    { codigo: "DPS", nome: "Bali - Denpasar (DPS)" },
    { codigo: "MNL", nome: "Manila (MNL)" },
    { codigo: "DEL", nome: "Nova Delhi (DEL)" },
    { codigo: "BOM", nome: "Mumbai (BOM)" },
    { codigo: "TPE", nome: "Taipei (TPE)" },
    { codigo: "DXB", nome: "Dubai (DXB)" },
    { codigo: "AUH", nome: "Abu Dhabi (AUH)" },
    { codigo: "DOH", nome: "Doha (DOH)" },

    // Oceania
    { codigo: "SYD", nome: "Sydney (SYD)" },
    { codigo: "MEL", nome: "Melbourne (MEL)" },
    { codigo: "BNE", nome: "Brisbane (BNE)" },
    { codigo: "PER", nome: "Perth (PER)" },
    { codigo: "AKL", nome: "Auckland (AKL)" },
    { codigo: "CHC", nome: "Christchurch (CHC)" },
    { codigo: "WLG", nome: "Wellington (WLG)" },

    // África
    { codigo: "JNB", nome: "Joanesburgo (JNB)" },
    { codigo: "CPT", nome: "Cidade do Cabo (CPT)" },
    { codigo: "CAI", nome: "Cairo (CAI)" },
    { codigo: "CMN", nome: "Casablanca (CMN)" },
    { codigo: "LOS", nome: "Lagos (LOS)" },
    { codigo: "NBO", nome: "Nairóbi (NBO)" },
    { codigo: "ADD", nome: "Adis Abeba (ADD)" },

    // América do Sul
    { codigo: "EZE", nome: "Buenos Aires - Ezeiza (EZE)" },
    { codigo: "AEP", nome: "Buenos Aires - Aeroparque (AEP)" },
    { codigo: "SCL", nome: "Santiago (SCL)" },
    { codigo: "LIM", nome: "Lima (LIM)" },
    { codigo: "BOG", nome: "Bogotá (BOG)" },
    { codigo: "UIO", nome: "Quito (UIO)" },
    { codigo: "GYE", nome: "Guayaquil (GYE)" },
    { codigo: "CCS", nome: "Caracas (CCS)" },
    { codigo: "MVD", nome: "Montevidéu (MVD)" },
    { codigo: "ASU", nome: "Assunção (ASU)" },
    { codigo: "VVI", nome: "Santa Cruz (VVI)" },
    { codigo: "LPB", nome: "La Paz (LPB)" },

    // América Central e Caribe
    { codigo: "PTY", nome: "Cidade do Panamá (PTY)" },
    { codigo: "SJO", nome: "San José (SJO)" },
    { codigo: "SAL", nome: "San Salvador (SAL)" },
    { codigo: "GUA", nome: "Cidade da Guatemala (GUA)" },
    { codigo: "MBJ", nome: "Montego Bay (MBJ)" },
    { codigo: "PUJ", nome: "Punta Cana (PUJ)" },
    { codigo: "SJU", nome: "San Juan (SJU)" },
    { codigo: "NAS", nome: "Nassau (NAS)" },
    { codigo: "HAV", nome: "Havana (HAV)" },
  ];

  // Inicializar o valor do input com o nome do aeroporto selecionado
  useEffect(() => {
    if (value) {
      const aeroporto = aeroportos.find((a) => a.codigo === value);
      if (aeroporto) {
        setInputValue(aeroporto.nome);
      }
    } else {
      setInputValue("");
    }
  }, [value]);

  // Fechar o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrar aeroportos com base no input
    if (value.trim() === "") {
      setFilteredAeroportos([]);
    } else {
      const filtered = aeroportos.filter(
        (aeroporto) =>
          aeroporto.nome.toLowerCase().includes(value.toLowerCase()) ||
          aeroporto.codigo.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAeroportos(filtered);
    }

    setShowDropdown(true);
  };

  const handleSelectAeroporto = (aeroporto) => {
    setInputValue(aeroporto.nome);
    onChange(aeroporto.codigo);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (inputValue.trim() !== "") {
      const filtered = aeroportos.filter(
        (aeroporto) =>
          aeroporto.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
          aeroporto.codigo.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredAeroportos(filtered);
    } else {
      setFilteredAeroportos(aeroportos.slice(0, 5)); // Mostrar os 5 primeiros quando vazio
    }
    setShowDropdown(true);
  };

  return (
    <div className="form-group autocomplete-container">
      <label htmlFor={id}>{label}</label>
      <div className="input-with-icon">
        <input
          type="text"
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={inputRef}
          autoComplete="off"
          required
        />
        <div className="search-icon"></div>
      </div>
      {showDropdown && filteredAeroportos.length > 0 && (
        <ul className="autocomplete-dropdown" ref={dropdownRef}>
          {filteredAeroportos.map((aeroporto) => (
            <li
              key={aeroporto.codigo}
              onClick={() => handleSelectAeroporto(aeroporto)}
              className={aeroporto.codigo === value ? "selected" : ""}
            >
              <span className="aeroporto-codigo">{aeroporto.codigo}</span>
              <span className="aeroporto-nome">
                {aeroporto.nome.replace(` (${aeroporto.codigo})`, "")}
              </span>
            </li>
          ))}
        </ul>
      )}
      <input type="hidden" name={id} value={value || ""} />
    </div>
  );
};

function CriarOferta() {
  const [preco, setPreco] = useState("");
  const [qtdMilhas, setQtdMilhas] = useState("");
  const [ciaAerea, setCiaAerea] = useState("");
  const [compraOuVenda, setCompraOuVenda] = useState("");
  const [feedback, setFeedback] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [aceito, setAceito] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Recuperar o usuarioId do token armazenado no localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login"); // Se não houver token, redireciona para login
  }

  const usuarioId = JSON.parse(localStorage.getItem("usuario"))?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      setFeedback("Usuário não autenticado");
      return;
    }

    if (compraOuVenda === "compra" && !aceito) {
      setFeedback("Você precisa aceitar os termos e condições");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const ofertaData = {
        preco,
        qtdMilhas,
        ciaAerea,
        compraOuVenda,
        usuarioId,
      };

      if (compraOuVenda === "compra") {
        ofertaData.origem = origem;
        ofertaData.destino = destino;
      }

      const response = await axios.post(
        "http://localhost:5001/api/ofertas/criarOferta",
        ofertaData
      );

      setFeedback(response.data.message);
      setTimeout(() => {
        navigate("/ofertas"); // Redirecionar para a página de ofertas após criar a oferta
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar oferta:", error);
      setFeedback("Erro ao criar oferta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criar-oferta-container">
      <div className="criar-oferta-card">
        <div className="criar-oferta-header">
          <h1>Criar Nova Oferta</h1>
          <p>Preencha os dados abaixo para criar sua oferta de milhas</p>
        </div>

        {feedback && (
          <div
            className={`feedback-message ${
              feedback.includes("Erro") ? "error" : "success"
            }`}
          >
            {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="criar-oferta-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                type="number"
                id="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 1000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="qtdMilhas">Quantidade de Milhas</label>
              <input
                type="number"
                id="qtdMilhas"
                value={qtdMilhas}
                onChange={(e) => setQtdMilhas(e.target.value)}
                placeholder="Ex: 10000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciaAerea">Companhia Aérea</label>
              <select
                id="ciaAerea"
                value={ciaAerea}
                onChange={(e) => setCiaAerea(e.target.value)}
                required
              >
                <option value="">Selecione a companhia</option>
                <option value="LATAM">LATAM</option>
                <option value="SMILES">SMILES (GOL)</option>
                <option value="AZUL">AZUL</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="compraOuVenda">Tipo de Oferta</label>
              <select
                id="compraOuVenda"
                value={compraOuVenda}
                onChange={(e) => setCompraOuVenda(e.target.value)}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="compra">Compra de Milhas</option>
                <option value="venda">Venda de Milhas</option>
              </select>
            </div>
          </div>

          {compraOuVenda === "compra" && (
            <div className="compra-details">
              <div className="form-row">
                <AeroportoAutocomplete
                  id="origem"
                  label="Origem"
                  value={origem}
                  onChange={setOrigem}
                  placeholder="Digite o nome ou código do aeroporto"
                />

                <AeroportoAutocomplete
                  id="destino"
                  label="Destino"
                  value={destino}
                  onChange={setDestino}
                  placeholder="Digite o nome ou código do aeroporto"
                />
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="aceito"
                  checked={aceito}
                  onChange={() => setAceito(!aceito)}
                  required
                />
                <label htmlFor="aceito">
                  Aceito os{" "}
                  <a href="/termos" target="_blank" rel="noreferrer">
                    termos e condições
                  </a>{" "}
                  para compra de milhas
                </label>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/ofertas")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-criar" disabled={loading}>
              {loading ? (
                <span className="loading-spinner">
                  <div className="spinner"></div> Processando...
                </span>
              ) : (
                "Criar Oferta"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarOferta;
