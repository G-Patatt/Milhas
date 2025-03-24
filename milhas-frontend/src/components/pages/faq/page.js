"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./page.css" // Importando o CSS

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: "Como encontrar a melhor oferta?",
      answer:
        "Se você quer viajar sem pagar caro, busque ofertas de milhas disponíveis na plataforma. Se tem milhas sobrando, encontre compradores interessados. Você pode filtrar por companhia aérea, origem, destino e valor para encontrar exatamente o que precisa. Nossa interface intuitiva permite comparar preços e condições de diferentes ofertas para escolher a que melhor atende às suas necessidades.",
    },
    {
      question: "Como criar minha oferta de milhas?",
      answer:
        "Cadastre sua oferta de compra ou venda especificando todos os detalhes: companhia aérea, origem, destino, data desejada e valor. Quanto mais detalhada for sua oferta, mais rápido encontrará um parceiro para negociar. Você pode definir um preço fixo ou um intervalo aceitável, além de especificar condições como flexibilidade de datas ou classe da passagem.",
    },
    {
      question: "Como funciona o sistema de garantias?",
      answer:
        "Para proteger ambas as partes, tanto o comprador quanto o vendedor precisam alocar garantias temporárias via cartão de crédito. Essas garantias são bloqueadas durante a transação e automaticamente liberadas após a conclusão bem-sucedida. Em caso de problemas, nossa equipe de suporte avalia a situação para determinar a liberação das garantias. Este sistema garante que ambas as partes cumpram suas obrigações na negociação.",
    },
    {
      question: "Como é feita a emissão da passagem?",
      answer:
        "O vendedor emite a passagem diretamente no nome do comprador utilizando suas milhas. O comprador recebe a confirmação da emissão e verifica todos os detalhes da passagem. A plataforma fornece um sistema seguro para o vendedor compartilhar o localizador e demais informações da passagem. O comprador tem um prazo de 24 horas para verificar se todos os detalhes estão corretos.",
    },
    {
      question: "Como funciona a confirmação e pagamento?",
      answer:
        "Após confirmar que a passagem foi emitida corretamente, o comprador aprova a transação. As garantias são liberadas para ambas as partes e o pagamento é transferido automaticamente do comprador para o vendedor. Todo o processo é monitorado pela MilesExchange para garantir que ambas as partes cumpram suas obrigações. O pagamento só é liberado após a confirmação da emissão correta da passagem.",
    },
    {
      question: "Quais taxas são cobradas pela plataforma?",
      answer:
        "A MilesExchange cobra uma taxa de 5% sobre o valor da transação para compradores e 3% para vendedores. Estas taxas são utilizadas para manter a plataforma funcionando, garantir a segurança das transações e oferecer suporte aos usuários. Não há taxas ocultas ou cobranças adicionais. Todas as taxas são apresentadas de forma transparente antes da conclusão da negociação.",
    },
    {
      question: "É seguro negociar milhas na plataforma?",
      answer:
        "Sim, todas as transações são protegidas pelo nosso sistema de segurança. O pagamento só é liberado para o vendedor após a confirmação da transferência das milhas, e todas as negociações são monitoradas pela nossa equipe. Além disso, o sistema de garantias mútuas protege ambas as partes contra fraudes. Nossa plataforma utiliza criptografia avançada para proteger dados pessoais e financeiros.",
    },
    {
      question: "Quanto tempo leva para concluir uma negociação?",
      answer:
        "O tempo médio para concluir uma negociação é de 24 a 48 horas, dependendo da rapidez com que comprador e vendedor realizam suas respectivas ações. A emissão da passagem pelo vendedor geralmente ocorre em até 24 horas após a alocação das garantias pelo comprador. Todo o processo é otimizado para garantir a maior agilidade possível sem comprometer a segurança.",
    },
    {
      question: "Quais programas de milhas são aceitos?",
      answer:
        "Atualmente aceitamos milhas dos seguintes programas: Latam Pass, Smiles, TudoAzul, American Airlines AAdvantage, Delta SkyMiles, United MileagePlus e Emirates Skywards. Estamos sempre trabalhando para adicionar novos programas à plataforma. Cada programa tem suas particularidades, e nossa plataforma está preparada para lidar com as regras específicas de cada um.",
    },
    {
      question: "Como recebo o pagamento pelas minhas milhas vendidas?",
      answer:
        "Após a confirmação da transferência das milhas pelo comprador, o valor é liberado para sua conta na plataforma. Você pode então solicitar a transferência para sua conta bancária, que será processada em até 3 dias úteis. Oferecemos múltiplas opções de pagamento, incluindo transferência bancária, PIX e outras formas de pagamento eletrônico.",
    },
    {
      question: "É legal negociar milhas aéreas?",
      answer:
        "Sim, a negociação de milhas entre pessoas físicas é legal no Brasil. No entanto, é importante ressaltar que cada programa de fidelidade possui seus próprios termos e condições. A MilesExchange opera dentro da legalidade e recomenda que todos os usuários estejam cientes das regras dos programas com os quais negociam. Nossa plataforma foi desenvolvida respeitando todas as regulamentações aplicáveis.",
    },
    {
      question: "O que acontece se o vendedor não emitir minha passagem?",
      answer:
        "Se o vendedor não emitir a passagem dentro do prazo estabelecido, você pode abrir uma disputa na plataforma. Nossa equipe de suporte irá analisar o caso e, se confirmado o não cumprimento, suas garantias serão liberadas e você receberá um reembolso integral. Temos um processo rigoroso de verificação para garantir que todas as disputas sejam resolvidas de forma justa e transparente.",
    },
  ]

  return (
    <div className="faq-page">
      <div className="container py-8">
        <Link to="/" className="voltar-link mb-6 inline-block">
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
            className="mr-2 inline"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar para a página inicial
        </Link>

        <div className="page-header mb-8">
          <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
          <p className="text-muted-foreground mt-2">
            Tire suas dúvidas sobre o processo de negociação de milhas na MilesExchange
          </p>
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

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Ainda tem dúvidas?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/processo-detalhado" className="btn btn-outline">
              Ver processo detalhado
            </Link>
            <Link to="/contato" className="btn btn-primary">
              Falar com nosso suporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

