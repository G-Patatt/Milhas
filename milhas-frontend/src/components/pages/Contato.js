"use client"

import { useState } from "react"
import "../css/Contato.css"

function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [feedback, setFeedback] = useState({ tipo: "", mensagem: "" })
  const [activeTab, setActiveTab] = useState("formulario")
  const [activeFaqItems, setActiveFaqItems] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFaqItem = (index) => {
    setActiveFaqItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setFeedback({ tipo: "", mensagem: "" })

    // Simulação de envio para API
    try {
      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulação de resposta bem-sucedida
      console.log("Dados enviados:", formData)
      setFeedback({
        tipo: "sucesso",
        mensagem: "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
      })

      // Limpar o formulário após envio bem-sucedido
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        mensagem: "",
      })
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setFeedback({
        tipo: "erro",
        mensagem: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="contato-container">
      <div className="contato-header">
        <h1>Entre em Contato</h1>
        <p className="contato-subtitle">Estamos aqui para ajudar com suas dúvidas sobre milhas e negociações</p>
      </div>

      <div className="contato-tabs">
        <button
          className={`contato-tab ${activeTab === "formulario" ? "active" : ""}`}
          onClick={() => setActiveTab("formulario")}
        >
          <i className="fa fa-envelope icon-margin-right"></i>
          Enviar Mensagem
        </button>
        <button className={`contato-tab ${activeTab === "faq" ? "active" : ""}`} onClick={() => setActiveTab("faq")}>
          <i className="fa fa-question-circle icon-margin-right"></i>
          Perguntas Frequentes
        </button>
      </div>

      <div className="contato-content">
        {activeTab === "formulario" && (
          <div className="contato-grid">
            <div className="contato-form-container">
              {feedback.mensagem && (
                <div className={`contato-feedback ${feedback.tipo}`}>
                  <i className={`fa ${feedback.tipo === "sucesso" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                  <span>{feedback.mensagem}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contato-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <div className="input-wrapper">
                    <i className="fa fa-user input-icon"></i>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <i className="fa fa-envelope input-icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="assunto">Assunto</label>
                  <div className="input-wrapper">
                    <i className="fa fa-tag input-icon"></i>
                    <input
                      type="text"
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      placeholder="Assunto da mensagem"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <div className="textarea-wrapper">
                    <i className="fa fa-comment input-icon"></i>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Digite sua mensagem aqui..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-enviar" disabled={enviando}>
                  {enviando ? (
                    <>
                      <div className="spinner-small"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa fa-paper-plane icon-margin-right"></i>
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="contato-info-container">
              <div className="contato-info-card">
                <h3 className="contato-info-title">Informações de Contato</h3>

                <div className="contato-info-item">
                  <div className="contato-info-icon">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <div className="contato-info-content">
                    <h4>Endereço</h4>
                    <p>Av. Paulista, 1000 - Bela Vista</p>
                    <p>São Paulo - SP, 01310-100</p>
                  </div>
                </div>

                <div className="contato-info-item">
                  <div className="contato-info-icon">
                    <i className="fa fa-phone-alt"></i>
                  </div>
                  <div className="contato-info-content">
                    <h4>Telefone</h4>
                    <p>+55 (11) 3456-7890</p>
                    <p>Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>

                <div className="contato-info-item">
                  <div className="contato-info-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div className="contato-info-content">
                    <h4>Email</h4>
                    <p>contato@milesexchange.com.br</p>
                    <p>suporte@milesexchange.com.br</p>
                  </div>
                </div>

                <div className="contato-social">
                  <h4>Redes Sociais</h4>
                  <div className="contato-social-links">
                    <a href="#" className="contato-social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                    <a href="#" className="contato-social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#" className="contato-social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#" className="contato-social-link">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="faq-container">
            {[
              {
                question: "Como funciona a negociação de milhas na plataforma?",
                answer: "Nossa plataforma funciona como uma bolsa de valores para milhas aéreas. Você pode comprar milhas de outros usuários ou vender suas próprias milhas. Todas as transações são seguras e garantidas pela MilesExchange."
              },
              {
                question: "É seguro negociar milhas na MilesExchange?",
                answer: "Sim, todas as transações são protegidas pelo nosso sistema de segurança. O pagamento só é liberado para o vendedor após a confirmação da transferência das milhas, e todas as negociações são monitoradas pela nossa equipe."
              },
              {
                question: "Quais são as taxas cobradas pela plataforma?",
                answer: "Cobramos uma taxa de 5% sobre o valor da transação para compradores e 3% para vendedores. Estas taxas são utilizadas para manter a plataforma funcionando e garantir a segurança das transações."
              },
              {
                question: "Como recebo o pagamento pelas minhas milhas vendidas?",
                answer: "Após a confirmação da transferência das milhas pelo comprador, o valor é liberado para sua conta na plataforma. Você pode então solicitar a transferência para sua conta bancária, que será processada em até 3 dias úteis."
              },
              {
                question: "Quais programas de fidelidade são aceitos?",
                answer: "Atualmente aceitamos milhas dos seguintes programas: Latam Pass, Smiles, TudoAzul, American Airlines AAdvantage, Delta SkyMiles, United MileagePlus e Emirates Skywards. Estamos sempre trabalhando para adicionar novos programas."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaqItems[index] ? 'active' : ''}`}
                onClick={() => toggleFaqItem(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <i className={`fa ${activeFaqItems[index] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Contato
