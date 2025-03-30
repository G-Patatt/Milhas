import "../css/NegociacaoPipeline.css"

function NegociacaoPipeline({ currentStage }) {
  // Garantir que currentStage seja um número entre 1 e 6
  const stage = Math.min(Math.max(Number.parseInt(currentStage) || 1, 1), 6)

  // Array com os dados das etapas
  const steps = [
    { number: 1, label: "Pagamento Realizado" },
    { number: 2, label: "Garantias Depositadas" },
    { number: 3, label: "Passagem Emitida" },
    { number: 4, label: "Comprovante Enviado" },
    { number: 5, label: "Recebimento Confirmado" },
    { number: 6, label: "Negociação Concluída" },
  ]

  return (
    <div className={`negociacao-pipeline stage-${stage}`}>
      {steps.map((step) => (
        <div
          key={`step-${step.number}`}
          className={`pipeline-step ${stage >= step.number ? "active" : ""} ${stage === step.number ? "current" : ""}`}
        >
          <div className="pipeline-step-number">
            {stage > step.number || (step.number === 6 && stage === 6) ? (
              <span className="pipeline-step-check">✓</span>
            ) : (
              step.number
            )}
          </div>
          <div className="pipeline-step-label">{step.label}</div>
        </div>
      ))}
    </div>
  )
}

export default NegociacaoPipeline

