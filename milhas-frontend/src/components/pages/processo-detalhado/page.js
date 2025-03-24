import { Link } from "react-router-dom"
import "./page.css" // Importando o CSS

export default function ProcessoDetalhadoPage() {
  const steps = [
    {
      number: 1,
      title: "Cadastro e Verificação",
      description:
        "Para começar, crie sua conta na MilesExchange. Após o cadastro, você passará por um processo de verificação de identidade para garantir a segurança de todos os usuários. Este processo geralmente leva menos de 24 horas e é essencial para manter a integridade da plataforma.",
    },
    {
      number: 2,
      title: "Criação da Oferta",
      description:
        "Após a verificação, você pode criar sua oferta de compra ou venda de milhas. Especifique a companhia aérea, quantidade de milhas, preço desejado e outras condições relevantes. Quanto mais detalhada for sua oferta, mais chances você tem de encontrar um parceiro para negociar.",
    },
    {
      number: 3,
      title: "Negociação e Acordo",
      description:
        "Quando um comprador ou vendedor se interessa pela sua oferta, vocês podem negociar os detalhes finais através do chat seguro da plataforma. Discutam preços, condições e cheguem a um acordo que seja benéfico para ambas as partes. A plataforma oferece ferramentas para facilitar este processo.",
    },
    {
      number: 4,
      title: "Alocação de Garantias",
      description:
        "Para proteger ambas as partes, tanto o comprador quanto o vendedor precisam alocar garantias temporárias via cartão de crédito. Estas garantias são bloqueadas durante a transação e automaticamente liberadas após a conclusão bem-sucedida. Este sistema garante que ambas as partes cumpram suas obrigações.",
    },
    {
      number: 5,
      title: "Emissão da Passagem",
      description:
        "O vendedor emite a passagem diretamente no nome do comprador utilizando suas milhas. O comprador recebe a confirmação da emissão e verifica todos os detalhes da passagem. A plataforma fornece um sistema seguro para o vendedor compartilhar o localizador e demais informações da passagem.",
    },
    {
      number: 6,
      title: "Confirmação e Pagamento",
      description:
        "Após confirmar que a passagem foi emitida corretamente, o comprador aprova a transação. As garantias são liberadas para ambas as partes e o pagamento é transferido automaticamente do comprador para o vendedor. Todo o processo é monitorado pela MilesExchange para garantir que ambas as partes cumpram suas obrigações.",
    },
    {
      number: 7,
      title: "Avaliação e Feedback",
      description:
        "Após a conclusão da transação, ambas as partes podem avaliar a experiência e fornecer feedback. Estas avaliações ajudam a construir a reputação dos usuários na plataforma e contribuem para um ambiente de negociação mais seguro e confiável para todos.",
    },
  ]

  return (
    <div className="processo-detalhado-page">
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

        <div className="page-header">
          <h1 className="text-3xl font-bold">Processo Detalhado</h1>
          <p className="text-muted-foreground mt-2">
            Entenda passo a passo como funciona a negociação de milhas na MilesExchange
          </p>
        </div>

        <div className="processo-steps">
          {steps.map((step) => (
            <div key={step.number} className="processo-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Pronto para começar?</h3>
          <p className="cta-description">
            Agora que você entende como funciona o processo, está na hora de começar a negociar suas milhas ou encontrar
            as melhores ofertas para sua próxima viagem.
          </p>
          <Link to="/ofertas" className="btn-comecar">
            Ver ofertas disponíveis
          </Link>
        </div>
      </div>
    </div>
  )
}

