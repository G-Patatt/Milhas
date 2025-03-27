import React, { useState } from "react";

function ReservaLimite() {
  //card test
  // const [cardNumber, setCardNumber] = useState('5031433215406351');
  // const [cvv, setCvv] = useState('123');
  // const [expiration, setExpiration] = useState('11/30');
  // const [holderName, setHolderName] = useState('APRO');
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  const [paymentLink, setPaymentLink] = useState("");
  console.log(
    JSON.stringify({
      title: "Produto Exemplo", // aqui sera a oferta
      quantity: 1, //quantity acredito que 1
      price: 100.0, //preco da oferta
    })
  );

  const criarPreference = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/mercadopago/preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Produto Exemplo",
            quantity: 1,
            price: 100.0,
          }),
        }
      );

      const data = await response.json();

      setPaymentLink(data.url); // Guarda o link retornado pelo Mercado Pago

      // Redireciona automaticamente o usuário
      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao criar a preference:", error);
    }
  };

  // const handleReserve = async () => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const response = await fetch('http://localhost:5001/api/mercadopago/token', {
  //       method: 'POST',  // Certifique-se de usar 'POST'
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         cardNumber,
  //         cvv,
  //         expiration,
  //         holderName,
  //       }),
  //     });
  //     console.log(JSON.stringify({
  //       cardNumber,
  //       cvv,
  //       expiration,
  //       holderName,
  //     }));
  //     const data = await response.json();
  //     console.log(data);
  //     if (response.ok) {
  //       setMessage(`${data.message}`);
  //     } else {
  //       setMessage(`Erro: ${data.error}`);
  //     }
  //   } catch (error) {
  //     setMessage('Erro ao conectar com o servidor.');
  //   }

  //   setLoading(false);
  // };

  return (
    // <div>

    //   <h2>Reserva de Limite</h2>
    //   <input
    //     type="text"
    //     placeholder="Número do Cartão"
    //     value={cardNumber}
    //     onChange={(e) => setCardNumber(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="CVV"
    //     value={cvv}
    //     onChange={(e) => setCvv(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Validade (MM/AA)"
    //     value={expiration}
    //     onChange={(e) => setExpiration(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Nome no Cartão"
    //     value={holderName}
    //     onChange={(e) => setHolderName(e.target.value)}
    //   />
    //   <button onClick={handleReserve} disabled={loading}>
    //     {loading ? 'Processando...' : 'Reservar Limite'}
    //   </button>
    //   {message && <p>{message}</p>}

    <div>
      <h1>Pagamento</h1>
      <button onClick={criarPreference}>Pagar</button>
      {paymentLink && (
        <p>
          Ou acesse:{" "}
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Link de Pagamento
          </a>
        </p>
      )}
    </div>

    // </div>
  );
}

export default ReservaLimite;
