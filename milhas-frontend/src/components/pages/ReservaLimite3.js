import React, { useState } from "react";

function ReservaLimite() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5003/api/mercadopago/preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redireciona automaticamente para o pagamento
      } else {
        alert("Erro ao gerar link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reserva de Limite</h2>
      <input
        type="number"
        placeholder="Digite o valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processando..." : "Gerar Pagamento"}
      </button>
    </div>
  );
}

export default ReservaLimite;
