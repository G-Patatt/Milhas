"use client"
import { useState } from "react"
import "../css/FaqSection.css"
import { Link } from "react-router-dom"

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Limitando a apenas 4 perguntas mais importantes
  const faqItems = [
    {
      question: "Como funciona o sistema de garantias?",
      answer:
        "Para proteger ambas as partes, tanto o comprador quanto o vendedor precisam alocar garantias temporárias via cartão de crédito. Essas garantias são bloqueadas durante a transação e automaticamente liberadas após a conclusão bem-sucedida. Em caso de problemas, nossa equipe de suporte avalia a situação para determinar a liberação das garantias.",
    },
    {
      question: "Como encontrar a melhor oferta?",
      answer:
        "Se você quer viajar sem pagar caro, busque ofertas de milhas disponíveis na plataforma. Se tem milhas sobrando, encontre compradores interessados. Você pode filtrar por companhia aérea, origem, destino e valor para encontrar exatamente o que precisa. Nossa interface intuitiva permite comparar preços e condições de diferentes ofertas.",
    },
    {
      question: "É seguro negociar milhas na plataforma?",
      answer:
        "Sim, todas as transações são protegidas pelo nosso sistema de segurança. O pagamento só é liberado para o vendedor após a confirmação da transferência das milhas, e todas as negociações são monitoradas pela nossa equipe. Além disso, o sistema de garantias mútuas protege ambas as partes contra fraudes.",
    },
    {
      question: "Quais programas de milhas são aceitos?",
      answer:
        "Atualmente aceitamos milhas dos seguintes programas: Latam Pass, Smiles, TudoAzul, American Airlines AAdvantage, Delta SkyMiles, United MileagePlus e Emirates Skywards. Estamos sempre trabalhando para adicionar novos programas à plataforma.",
    },
  ]

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2>Perguntas Frequentes</h2>
          <p>Tire suas dúvidas sobre o processo de negociação de milhas</p>
        </div>

        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <div className="faq-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <Link to="/faq" className="btn-mais-perguntas">
            Ver mais perguntas frequentes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FaqSection

