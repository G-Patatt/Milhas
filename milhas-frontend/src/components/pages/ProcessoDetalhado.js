"use client"
import "../css/ProcessoDetalhado.css"

function ProcessoDetalhado() {
  return (
    <section className="processo-detalhado-section">
      <div className="container">
        <div className="processo-detalhado-header">
          <h2>Entenda o processo em detalhes</h2>
          <p>Saiba como funciona cada etapa da negociação de milhas na MilesExchange</p>
        </div>

        <div className="processo-detalhado-grid">
          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-search"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Encontre a melhor oferta</h3>
              <p>
                Se você quer viajar sem pagar caro, busque ofertas de milhas disponíveis. Se tem milhas sobrando,
                encontre compradores interessados. Você pode filtrar por companhia aérea, origem, destino e valor.
              </p>
            </div>
          </div>

          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-file-text"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Crie sua oferta</h3>
              <p>
                Cadastre sua oferta de compra ou venda especificando todos os detalhes: companhia aérea, origem,
                destino, data desejada e valor. Quanto mais detalhada for sua oferta, mais rápido encontrará um parceiro
                para negociar.
              </p>
            </div>
          </div>

          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-shield"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Sistema de garantias</h3>
              <p>
                Para proteger ambas as partes, tanto comprador quanto vendedor alocam garantias temporárias via cartão
                de crédito. Essas garantias são devolvidas automaticamente após a conclusão bem-sucedida da transação.
              </p>
            </div>
          </div>

          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-plane"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Emissão da passagem</h3>
              <p>
                O vendedor emite a passagem diretamente no nome do comprador utilizando suas milhas. O comprador recebe
                a confirmação da emissão e verifica todos os detalhes da passagem.
              </p>
            </div>
          </div>

          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-check-circle"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Confirmação e pagamento</h3>
              <p>
                Após confirmar que a passagem foi emitida corretamente, o comprador aprova a transação. As garantias são
                liberadas para ambas as partes e o pagamento é transferido automaticamente do comprador para o vendedor.
              </p>
            </div>
          </div>

          <div className="processo-detalhado-card">
            <div className="processo-detalhado-icon">
              <i className="fa fa-lock"></i>
            </div>
            <div className="processo-detalhado-content">
              <h3>Segurança garantida</h3>
              <p>
                Todo o processo é monitorado pela MilesExchange. Em caso de qualquer problema, nossa equipe de suporte
                está disponível para mediar e resolver questões entre as partes, garantindo uma experiência segura e
                confiável.
              </p>
            </div>
          </div>
        </div>

        <div className="processo-detalhado-cta">
          <h3>Pronto para começar?</h3>
          <button className="btn-comecar">Criar minha primeira oferta</button>
        </div>
      </div>
    </section>
  )
}

export default ProcessoDetalhado

