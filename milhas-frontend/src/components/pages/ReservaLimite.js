import React, { useState } from 'react';

function ReservaLimite() {
  const [cardNumber, setCardNumber] = useState('5031433215406351');
  const [cvv, setCvv] = useState('123');
  const [expiration, setExpiration] = useState('11/30');
  const [holderName, setHolderName] = useState('APRO');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleReserve = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/mercadopago/token', {
        method: 'POST',  // Certifique-se de usar 'POST'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber,
          cvv,
          expiration,
          holderName,
        }),
      });
      console.log(JSON.stringify({
        cardNumber,
        cvv,
        expiration,
        holderName,
      }));
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(`${data.message}`);
      } else {
        setMessage(`Erro: ${data.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  
    setLoading(false);
  };


  return (
    <div>
      <h2>Reserva de Limite</h2>
      <input
        type="text"
        placeholder="Número do Cartão"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <input
        type="text"
        placeholder="Validade (MM/AA)"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome no Cartão"
        value={holderName}
        onChange={(e) => setHolderName(e.target.value)}
      />
      <button onClick={handleReserve} disabled={loading}>
        {loading ? 'Processando...' : 'Reservar Limite'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReservaLimite;
