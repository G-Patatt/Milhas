"use client";




import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/NegociacaoDetalhe.css"; // Importando o arquivo CSS personalizado
import EnvioComprovanteForm from "./EnvioComprovanteForm"; // Importando o componente de formulário
import NegociacaoPipeline from "./NegociacaoPipeline"; // Importando o componente de pipeline

function DetalhesNegociacao() {
  const API = process.env.REACT_APP_API_BASE;
  const { id } = useParams(); // Acessando o id da URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ofertaId = queryParams.get("ofertaId");

  const [negociacao, setNegociacao] = useState(null);
  const [usuarioVendedor, setUsuarioVendedor] = useState(null);
  const [usuarioComprador, setUsuarioComprador] = useState(null);
  const [oferta, setOferta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [enviandoComprovante, setEnviandoComprovante] = useState(false);
  const [erroFormulario, setErroFormulario] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Obter o usuário atual do localStorage
  const usuarioAtual = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function carregarDados() {
      setLoading(true);
      try {
        // Buscar dados da negociação
        const negociacaoResponse = await axios.get(
          `${API}/api/negociacao/${id}?ofertaId=${ofertaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!negociacaoResponse.data) {
          setFeedback("Negociação não encontrada");
          setLoading(false);
          return;
        }

        const dadosNegociacao = negociacaoResponse.data;

        // Buscar dados da oferta
        const ofertaResponse = await axios.get(
          `${API}/api/ofertas/${dadosNegociacao.negociacao.ofertaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Buscar dados dos usuários
        const compradorResponse = await axios.get(
          `${API}/api/usuarios/${dadosNegociacao.negociacao.usuarioIdComprador}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const vendedorResponse = await axios.get(
          `${API}/api/usuarios/${dadosNegociacao.negociacao.usuarioIdVendedor}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Atualizar estados
        setNegociacao(dadosNegociacao.negociacao);
        setOferta(ofertaResponse.data);
        setUsuarioComprador(compradorResponse.data);
        setUsuarioVendedor(vendedorResponse.data);
        setFeedback("");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        if (error.response && error.response.status === 401) {
          setFeedback("Sessão expirada. Redirecionando para login...");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setFeedback("Erro ao carregar detalhes da negociação.");
        }
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id, ofertaId, token, navigate]);

  // Função para atualizar o status da negociação
  const atualizarStatusNegociacao = async (negociacaoId, novoStatus) => {
    try {
      const response = await axios.put(
        `${API}/api/negociacao/${negociacaoId}/status`,
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status da negociação:", error);
      return null;
    }
  };

  // Verificar se o usuário atual é o comprador
  const isComprador =
    usuarioAtual &&
    negociacao &&
    usuarioAtual.id === negociacao.usuarioIdComprador;

  // Verificar se o usuário atual é o vendedor
  const isVendedor =
    usuarioAtual &&
    negociacao &&
    usuarioAtual.id === negociacao.usuarioIdVendedor;

  // Função para redirecionar para a página de avaliação
  const redirecionarParaAvaliacao = () => {
    const usuarioParaAvaliar = isComprador
      ? negociacao.usuarioIdVendedor
      : negociacao.usuarioIdComprador;
    navigate(`/avaliacao/${negociacao.negociacaoId}/${usuarioParaAvaliar}`);
  };

  // Função para criar preferência de pagamento
  const criarPreference = async () => {
    // Verificar se o usuário atual é o comprador
    const isComprador =
      usuarioAtual &&
      negociacao &&
      usuarioAtual.id === negociacao.usuarioIdComprador;
    // Verificar se o usuário atual é o vendedor
    const isVendedor =
      usuarioAtual &&
      negociacao &&
      usuarioAtual.id === negociacao.usuarioIdVendedor;

    console.log(oferta);
    if (!oferta || !negociacao) return;

    setProcessandoPagamento(true);
    try {
      const response = await axios.post(
        `${API}/api/mercadopago/preference`,
        {
          title: `Milhas ${oferta.ciaAerea}`,
          quantity: oferta.qtdMilhas,
          price: 1.0,
          usuarioId: usuarioAtual.id,
          role: isComprador ? "comprador" : "vendedor",
          negociacaoId: negociacao.negociacaoId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);

      // Atualizar status da negociação com base em quem está realizando a ação
      let novoStatus;
      if (isComprador) {
        // Verificar se o vendedor já alocou garantias
        if (
          negociacao.status &&
          negociacao.status.toLowerCase().includes("vendedor alocou garantias")
        ) {
          novoStatus =
            "Comprador gerou o link para pagamento final mas ainda não pagou";
        } else {
          novoStatus = "Comprador gerou o link mas ainda não pagou";
        }
      } else if (isVendedor) {
        // Lógica para o vendedor
        if (
          negociacao.status &&
          negociacao.status.toLowerCase().includes("vendedor gerou o link")
        ) {
          novoStatus = "Vendedor gerou o link novamente mas ainda não pagou";
        } else {
          novoStatus = "Vendedor gerou o link mas ainda não pagou";
        }
      }

      await atualizarStatusNegociacao(negociacao.negociacaoId, novoStatus);

      // Atualizar o estado local da negociação
      setNegociacao({
        ...negociacao,
        status: novoStatus,
      });

      // Redirecionar para a página de pagamento
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Erro ao criar preferência de pagamento:", error);
      setFeedback("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setProcessandoPagamento(false);
    }
  };

  // Função para enviar o comprovante e código de reserva
  const enviarComprovante = async ({ codigoReserva, comprovante }) => {
    if (!negociacao) return;

    setEnviandoComprovante(true);
    setErroFormulario("");

    try {
      // Criar um FormData para enviar o arquivo
      const formData = new FormData();
      formData.append("comprovante", comprovante);
      formData.append("codigoReserva", codigoReserva);
      formData.append("negociacaoId", negociacao.negociacaoId);

      // Simulando o envio do comprovante
      // Na implementação real, você enviaria para o backend
      // const response = await axios.post(
      //   `${API}/api/negociacao/${negociacao.negociacaoId}/comprovante`,
      //   formData,
      //   { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      // );

      // Simulando um atraso para demonstração
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar o status da negociação
      const novoStatus =
        "Esperando comprador confirmar o recebimento da passagem no e-mail";
      await atualizarStatusNegociacao(negociacao.negociacaoId, novoStatus);

      // Atualizar o estado local
      setNegociacao({
        ...negociacao,
        status: novoStatus,
        codigoReserva: codigoReserva,
        // Na implementação real, você armazenaria a URL do comprovante retornada pelo backend
        comprovanteUrl: URL.createObjectURL(comprovante),
      });

      setFeedback("Comprovante enviado com sucesso!");

      // Esconder o feedback após alguns segundos
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar comprovante:", error);
      setErroFormulario("Erro ao enviar o comprovante. Tente novamente.");
    } finally {
      setEnviandoComprovante(false);
    }
  };

  // Função para mostrar a modal de confirmação
  const mostrarModalConfirmacao = () => {
    setShowConfirmModal(true);
  };

  // Função para confirmar o recebimento do e-mail
  const confirmarRecebimentoEmail = async () => {
    if (!negociacao) return;

    setProcessandoPagamento(true);
    setShowConfirmModal(false);

    try {
      // Atualizar o status da negociação
      const novoStatus =
        "Finalizada parcialmente, aguardando 24h para evitar cancelamento de passagem";
      await atualizarStatusNegociacao(negociacao.negociacaoId, novoStatus);

      // Atualizar o estado local
      setNegociacao({
        ...negociacao,
        status: novoStatus,
      });

      setFeedback("Recebimento confirmado com sucesso!");

      // Esconder o feedback após alguns segundos
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao confirmar recebimento:", error);
      setFeedback("Erro ao confirmar recebimento. Tente novamente.");
    } finally {
      setProcessandoPagamento(false);
    }
  };

  // Função para formatar o preço
  const formatarPreco = (preco) => {
    return Number.parseFloat(preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para formatar a quantidade de milhas
  const formatarMilhas = (milhas) => {
    return Number.parseInt(milhas).toLocaleString("pt-BR");
  };

  // Função para determinar a classe do badge de status
  const getStatusClass = (status) => {
    if (!status) return "status-pendente";

    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("confirmad") ||
      statusLower.includes("concluíd") ||
      statusLower.includes("finalizada")
    ) {
      return "status-confirmada";
    } else if (statusLower.includes("pag")) {
      return "status-pagamento";
    } else {
      return "status-pendente";
    }
  };

  // Função para verificar se o vendedor já gerou o link de pagamento
  const vendedorGerouLink = () => {
    if (!negociacao || !negociacao.status) return false;
    return negociacao.status.toLowerCase().includes("vendedor gerou o link");
  };

  // Função para verificar se o comprador já gerou o link de pagamento
  const compradorGerouLink = () => {
    if (!negociacao || !negociacao.status) return false;
    return negociacao.status.toLowerCase().includes("comprador gerou o link");
  };

  // Função para verificar se o status é "Vendedor alocou garantias"
  const vendedorAlocouGarantias = () => {
    if (!negociacao || !negociacao.status) return false;
    return negociacao.status
      .toLowerCase()
      .includes("vendedor alocou garantias");
  };

  // Função para verificar se o status é "Esperando comprador confirmar o recebimento"
  const esperandoConfirmacaoComprador = () => {
    if (!negociacao || !negociacao.status) return false;
    return negociacao.status
      .toLowerCase()
      .includes("esperando comprador confirmar");
  };

  // Função para verificar se a negociação está finalizada parcialmente
  const negociacaoFinalizadaParcialmente = () => {
    if (!negociacao || !negociacao.status) return false;
    return negociacao.status.toLowerCase().includes("finalizada parcialmente");
  };

  // Função para determinar o estágio atual do pipeline
  const getEstagioPipeline = () => {
    if (!negociacao || !negociacao.status) return 1;

    const status = negociacao.status.toLowerCase();

    if (
      status.includes("comprador gerou o link") ||
      status.includes("aguardando comprador")
    ) {
      return 1; // Pagamento
    } else if (
      status.includes("vendedor gerou o link") ||
      status.includes("aguardando vendedor")
    ) {
      return 2; // Garantias
    } else if (status.includes("vendedor alocou garantias")) {
      return 3; // Emissão
    } else if (status.includes("esperando comprador confirmar")) {
      return 4; // Confirmação
    } else if (status.includes("finalizada parcialmente")) {
      return 5; // Finalização
    } else if (status.includes("concluída")) {
      return 6; // Concluída
    } else {
      return 1; // Padrão: Pagamento
    }
  };

  console.log(usuarioComprador, usuarioVendedor);

  return (
    <div className="negociacao-detalhe-container">
      <div className="negociacao-detalhe-header">
        <div className="negociacao-detalhe-back-button-container">
          <button
            className="btn-voltar"
            onClick={() => navigate(`/negociacoes/usuario/${usuarioAtual.id}`)}
          >
            <i className="fa fa-arrow-left icon-margin-right"></i>
            Voltar para Negociações
          </button>
        </div>
        <h1>Detalhes da Negociação</h1>
        <p className="negociacao-detalhe-subtitle">
          Informações completas sobre a transação
        </p>
      </div>

      {/* Mostrar a mensagem de feedback (erro ou ausência de negociações) */}
      {feedback && (
        <div className="negociacao-detalhe-feedback">{feedback}</div>
      )}

      {/* Mostrar indicador de carregamento */}
      {loading ? (
        <div className="negociacao-detalhe-loading">
          <div className="spinner"></div>
          <p>Carregando detalhes da negociação...</p>
        </div>
      ) : negociacao && oferta ? (
        <div className="negociacao-detalhe-content">
          {/* Pipeline de status - usando o componente separado */}
          <NegociacaoPipeline currentStage={getEstagioPipeline()} />

          {/* Card principal com informações da negociação */}
          <div className="negociacao-detalhe-card">
            <div className="negociacao-detalhe-card-header">
              <div className="negociacao-detalhe-badges">
                <span
                  className={`negociacao-detalhe-badge ${getStatusClass(
                    negociacao.status
                  )}`}
                >
                  <i className="fa fa-circle icon-margin-right"></i>
                  {negociacao.status || "Pendente"}
                </span>
                {isComprador && (
                  <span className="negociacao-detalhe-badge tipo-comprador">
                    <i className="fa fa-user icon-margin-right"></i>
                    Você é o Comprador
                  </span>
                )}
                {isVendedor && (
                  <span className="negociacao-detalhe-badge tipo-vendedor">
                    <i className="fa fa-user icon-margin-right"></i>
                    Você é o Vendedor
                  </span>
                )}
              </div>
              <h2 className="negociacao-detalhe-titulo">
                Negociação #
                {negociacao.negociacaoId.toString().padStart(4, "0")}
              </h2>
            </div>

            <div className="negociacao-detalhe-card-body">
              <div className="negociacao-detalhe-grid">
                {/* Coluna de informações da negociação */}
                <div className="negociacao-detalhe-info-section">
                  <h3 className="negociacao-detalhe-section-title">
                    Informações da Negociação
                  </h3>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-hashtag negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        ID da Negociação
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {negociacao.negociacaoId}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-calendar negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Data de Criação
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {new Date().toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-user negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Comprador
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {usuarioComprador
                          ? usuarioComprador.email
                          : "Carregando..."}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-user negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">Vendedor</span>
                      <span className="negociacao-detalhe-valor">
                        {usuarioVendedor
                          ? usuarioVendedor.email
                          : "Carregando..."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coluna de informações da oferta */}
                <div className="negociacao-detalhe-info-section">
                  <h3 className="negociacao-detalhe-section-title">
                    Detalhes da Oferta
                  </h3>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-tag negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Tipo de Oferta
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {oferta.compraOuVenda}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-plane negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Companhia Aérea
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {oferta.ciaAerea}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <div className="milhas-icon">
                      <span>M</span>
                    </div>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Quantidade de Milhas
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {formatarMilhas(oferta.qtdMilhas)} milhas
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-money-bill-wave negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Preço Total
                      </span>
                      <span className="negociacao-detalhe-valor-destaque">
                        {formatarPreco(oferta.preco)}
                      </span>
                    </div>
                  </div>

                  <div className="negociacao-detalhe-info-item">
                    <i className="fa fa-calculator negociacao-detalhe-icon"></i>
                    <div>
                      <span className="negociacao-detalhe-label">
                        Preço por 1.000 milhas
                      </span>
                      <span className="negociacao-detalhe-valor">
                        {formatarPreco(
                          (oferta.preco / oferta.qtdMilhas) * 1000
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção de ações */}
              {isComprador && (
                <div className="negociacao-detalhe-actions">
                  <h3 className="negociacao-detalhe-section-title">
                    Ações Disponíveis
                  </h3>

                  {esperandoConfirmacaoComprador() ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-info-circle icon-margin-right"></i>
                        <span>
                          O vendedor enviou o código da reserva e o comprovante
                          da passagem. Por favor, verifique seu e-mail e
                          confirme o recebimento.
                        </span>
                      </div>
                      {negociacao.codigoReserva && (
                        <div className="negociacao-detalhe-info-item reserva-info">
                          <i className="fa fa-ticket-alt negociacao-detalhe-icon"></i>
                          <div>
                            <span className="negociacao-detalhe-label">
                              Código da Reserva
                            </span>
                            <span className="negociacao-detalhe-valor">
                              {negociacao.codigoReserva}
                            </span>
                          </div>
                        </div>
                      )}
                      {negociacao.comprovanteUrl && (
                        <div className="negociacao-detalhe-comprovante">
                          <a
                            href={negociacao.comprovanteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-comprovante"
                          >
                            <i className="fa fa-file-pdf icon-margin-right"></i>
                            Ver Comprovante
                          </a>
                        </div>
                      )}
                      <div
                        className="negociacao-detalhe-buttons"
                        style={{ marginTop: "1rem" }}
                      >
                        <button
                          className="btn-pagar"
                          onClick={mostrarModalConfirmacao}
                          disabled={processandoPagamento}
                        >
                          {processandoPagamento ? (
                            <>
                              <div className="spinner-small"></div>
                              <span>Processando...</span>
                            </>
                          ) : (
                            <>
                              <i className="fa fa-check-circle icon-margin-right"></i>
                              Confirmar recebimento do e-mail da CIA AÉREA
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : negociacaoFinalizadaParcialmente() ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-check-circle icon-margin-right"></i>
                        <span>
                          Você confirmou o recebimento da passagem. A negociação
                          está aguardando o período de 24h para evitar
                          cancelamentos.
                        </span>
                      </div>
                      <div className="negociacao-detalhe-info-item reserva-info">
                        <i className="fa fa-ticket-alt negociacao-detalhe-icon"></i>
                        <div>
                          <span className="negociacao-detalhe-label">
                            Código da Reserva
                          </span>
                          <span className="negociacao-detalhe-valor">
                            {negociacao.codigoReserva}
                          </span>
                        </div>
                      </div>
                      {negociacao.comprovanteUrl && (
                        <div className="negociacao-detalhe-comprovante">
                          <a
                            href={negociacao.comprovanteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-comprovante"
                          >
                            <i className="fa fa-file-pdf icon-margin-right"></i>
                            Ver Comprovante
                          </a>
                        </div>
                      )}
                      <div
                        className="negociacao-detalhe-buttons"
                        style={{ marginTop: "1rem" }}
                      >
                        <button
                          className="btn-pagar"
                          onClick={redirecionarParaAvaliacao}
                        >
                          <i className="fa fa-star icon-margin-right"></i>
                          Avaliar Vendedor
                        </button>
                      </div>
                    </>
                  ) : negociacao.status
                      ?.toLowerCase()
                      .includes("vendedor alocou garantias") ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-check-circle icon-margin-right"></i>
                        <span>
                          O vendedor já alocou as garantias. A negociação foi
                          concluída com sucesso!
                        </span>
                      </div>
                      <div
                        className="negociacao-detalhe-buttons"
                        style={{ marginTop: "1rem" }}
                      >
                        <button
                          className="btn-pagar"
                          onClick={redirecionarParaAvaliacao}
                        >
                          <i className="fa fa-star icon-margin-right"></i>
                          Avaliar Vendedor
                        </button>
                      </div>
                    </>
                  ) : negociacao.status
                      ?.toLowerCase()
                      .includes("negociação concluída") ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-check-circle icon-margin-right"></i>
                        <span>
                          A negociação foi concluída com sucesso! Você pode
                          avaliar o vendedor agora.
                        </span>
                      </div>
                      <div
                        className="negociacao-detalhe-buttons"
                        style={{ marginTop: "1rem" }}
                      >
                        <button
                          className="btn-pagar"
                          onClick={redirecionarParaAvaliacao}
                        >
                          <i className="fa fa-star icon-margin-right"></i>
                          Avaliar Vendedor
                        </button>
                      </div>
                    </>
                  ) : negociacao.status
                      ?.toLowerCase()
                      .includes("aguardando vendedor") ? (
                    <div className="negociacao-detalhe-status-info">
                      <i className="fa fa-check-circle icon-margin-right"></i>
                      <span>
                        Você já realizou o pagamento. Aguardando o vendedor
                        alocar as garantias para prosseguir com a negociação.
                      </span>
                    </div>
                  ) : vendedorGerouLink() ? (
                    <div className="negociacao-detalhe-status-info">
                      <i className="fa fa-info-circle icon-margin-right"></i>
                      <span>
                        O vendedor está em processo de alocação de garantias.
                        Aguarde a conclusão deste processo para prosseguir com a
                        negociação.
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="negociacao-detalhe-info-text">
                        Para prosseguir com esta negociação, você precisa
                        realizar o pagamento através do MercadoPago. Após a
                        confirmação do pagamento, o vendedor será notificado
                        para transferir as milhas.
                      </p>

                      {compradorGerouLink() && (
                        <div className="negociacao-detalhe-warning">
                          <i className="fa fa-exclamation-triangle icon-margin-right"></i>
                          <span>
                            Você já gerou um link de pagamento, mas ainda não
                            concluiu o pagamento.
                          </span>
                        </div>
                      )}

                      <div className="negociacao-detalhe-buttons">
                        <button
                          className={`btn-pagar ${
                            compradorGerouLink() ? "btn-secondary" : ""
                          }`}
                          onClick={criarPreference}
                          disabled={processandoPagamento}
                        >
                          {processandoPagamento ? (
                            <>
                              <div className="spinner-small"></div>
                              <span>Processando...</span>
                            </>
                          ) : (
                            <>
                              <i
                                className={`fa ${
                                  compradorGerouLink()
                                    ? "fa-refresh"
                                    : "fa-credit-card"
                                } icon-margin-right`}
                              ></i>
                              {compradorGerouLink()
                                ? "Gerar Link Novamente"
                                : "Realizar Pagamento"}
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {isVendedor && (
                <div className="negociacao-detalhe-actions">
                  <h3 className="negociacao-detalhe-section-title">
                    Ações Disponíveis
                  </h3>

                  {esperandoConfirmacaoComprador() ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-info-circle icon-margin-right"></i>
                        <span>
                          Você enviou o código da reserva e o comprovante da
                          passagem. Aguarde o comprador confirmar o recebimento.
                        </span>
                      </div>
                      <div className="negociacao-detalhe-info-item reserva-info">
                        <i className="fa fa-ticket-alt negociacao-detalhe-icon"></i>
                        <div>
                          <span className="negociacao-detalhe-label">
                            Código da Reserva
                          </span>
                          <span className="negociacao-detalhe-valor">
                            {negociacao.codigoReserva}
                          </span>
                        </div>
                      </div>
                      {negociacao.comprovanteUrl && (
                        <div className="negociacao-detalhe-comprovante">
                          <a
                            href={negociacao.comprovanteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-comprovante"
                          >
                            <i className="fa fa-file-pdf icon-margin-right"></i>
                            Ver Comprovante
                          </a>
                        </div>
                      )}
                    </>
                  ) : negociacaoFinalizadaParcialmente() ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-check-circle icon-margin-right"></i>
                        <span>
                          O comprador confirmou o recebimento da passagem. A
                          negociação está aguardando o período de 24h para
                          evitar cancelamentos.
                        </span>
                      </div>
                      <div className="negociacao-detalhe-info-item reserva-info">
                        <i className="fa fa-ticket-alt negociacao-detalhe-icon"></i>
                        <div>
                          <span className="negociacao-detalhe-label">
                            Código da Reserva
                          </span>
                          <span className="negociacao-detalhe-valor">
                            {negociacao.codigoReserva}
                          </span>
                        </div>
                      </div>
                      {negociacao.comprovanteUrl && (
                        <div className="negociacao-detalhe-comprovante">
                          <a
                            href={negociacao.comprovanteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-comprovante"
                          >
                            <i className="fa fa-file-pdf icon-margin-right"></i>
                            Ver Comprovante
                          </a>
                        </div>
                      )}
                      <div
                        className="negociacao-detalhe-buttons"
                        style={{ marginTop: "1rem" }}
                      >
                        <button
                          className="btn-pagar"
                          onClick={redirecionarParaAvaliacao}
                        >
                          <i className="fa fa-star icon-margin-right"></i>
                          Avaliar Comprador
                        </button>
                      </div>
                    </>
                  ) : vendedorAlocouGarantias() ? (
                    <>
                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-check-circle icon-margin-right"></i>
                        <span>
                          Você já alocou as garantias. Agora é necessário enviar
                          o código da reserva e o comprovante da passagem.
                        </span>
                      </div>

                      {/* Aqui está o componente EnvioComprovanteForm */}
                      <EnvioComprovanteForm
                        onSubmit={enviarComprovante}
                        isLoading={enviandoComprovante}
                        errorMessage={erroFormulario}
                      />
                    </>
                  ) : negociacao.status
                      ?.toLowerCase()
                      .includes("comprador alocou garantias") ||
                    negociacao.status
                      ?.toLowerCase()
                      .includes("aguardando vendedor") ||
                    vendedorGerouLink() ? (
                    <>
                      <p className="negociacao-detalhe-info-text">
                        {vendedorGerouLink()
                          ? "Você precisa concluir o processo de alocação de garantias."
                          : "O comprador já alocou as garantias. Agora é sua vez de alocar as garantias para prosseguir com a negociação."}
                      </p>

                      {vendedorGerouLink() ? (
                        <div className="negociacao-detalhe-warning">
                          <i className="fa fa-exclamation-triangle icon-margin-right"></i>
                          <span>
                            Você já gerou um link para alocar garantias, mas
                            ainda não concluiu o processo.
                          </span>
                        </div>
                      ) : (
                        <div className="negociacao-detalhe-warning">
                          <i className="fa fa-exclamation-triangle icon-margin-right"></i>
                          <span>
                            Você precisa alocar as garantias para concluir esta
                            etapa da negociação.
                          </span>
                        </div>
                      )}

                      <div className="negociacao-detalhe-buttons">
                        <button
                          className={`btn-pagar ${
                            vendedorGerouLink() ? "btn-secondary" : ""
                          }`}
                          onClick={criarPreference}
                          disabled={processandoPagamento}
                        >
                          {processandoPagamento ? (
                            <>
                              <div className="spinner-small"></div>
                              <span>Processando...</span>
                            </>
                          ) : (
                            <>
                              <i
                                className={`fa ${
                                  vendedorGerouLink()
                                    ? "fa-refresh"
                                    : "fa-shield-alt"
                                } icon-margin-right`}
                              ></i>
                              {vendedorGerouLink()
                                ? "Gerar Link Novamente"
                                : "Alocar Garantias"}
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="negociacao-detalhe-info-text">
                        Aguarde o comprador realizar o pagamento. Você será
                        notificado quando o pagamento for confirmado para que
                        possa transferir as milhas.
                      </p>

                      <div className="negociacao-detalhe-status-info">
                        <i className="fa fa-info-circle icon-margin-right"></i>
                        <span>
                          {compradorGerouLink()
                            ? "O comprador gerou o link de pagamento, mas ainda não concluiu o pagamento."
                            : negociacao.status?.toLowerCase().includes("pag")
                            ? "Pagamento em processamento. Aguarde a confirmação."
                            : "Aguardando o comprador iniciar o pagamento."}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Botão para voltar */}
          <div className="negociacao-detalhe-footer"></div>
        </div>
      ) : (
        <div className="negociacao-detalhe-not-found">
          <i className="fa fa-search fa-3x"></i>
          <p>
            Negociação não encontrada ou você não tem permissão para
            visualizá-la.
          </p>
          <button
            className="btn-voltar"
            onClick={() => navigate(`/negociacoes/usuario/${usuarioAtual.id}`)}
          >
            <i className="fa fa-arrow-left icon-margin-right"></i>
            Voltar para Negociações
          </button>
        </div>
      )}

      {/* Modal de confirmação */}
      {showConfirmModal && (
        <div className="negociacao-detalhe-modal-overlay">
          <div className="negociacao-detalhe-modal">
            <div className="negociacao-detalhe-modal-header">
              <h3>Confirmar Recebimento</h3>
              <button
                className="negociacao-detalhe-modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="negociacao-detalhe-modal-body">
              <p>
                Você confirma que recebeu o e-mail da companhia aérea com os
                detalhes da passagem?
              </p>
              <p className="negociacao-detalhe-modal-warning">
                <i className="fa fa-exclamation-triangle icon-margin-right"></i>
                Ao confirmar, você declara que verificou todos os detalhes da
                passagem e que está de acordo com o combinado.
              </p>
            </div>
            <div className="negociacao-detalhe-modal-footer">
              <button
                className="negociacao-detalhe-modal-btn-cancelar"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>
              <button
                className="negociacao-detalhe-modal-btn-confirmar"
                onClick={confirmarRecebimentoEmail}
              >
                Confirmar Recebimento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalhesNegociacao;
