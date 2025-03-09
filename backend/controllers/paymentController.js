// controllers/mercadoPagoController.js
const fetch = require('node-fetch');  // ou axios, se preferir
const { v4: uuidv4 } = require('uuid');  // Para gerar um UUID

const gerarToken = async (req, res) => {
  const { cardNumber, cvv, expiration, holderName } = req.body;

  try {
    console.log('Cheguei aqui', JSON.stringify({
      card_number: cardNumber,
      security_code: cvv,
      expiration_month: expiration.split('/')[0],
      expiration_year: `20${expiration.split('/')[1]}`,
      cardholder: { name: holderName },
    }));

    // Criar o token do cartão
    const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer TEST-2442398020518072-030911-c8d99899e5d57fe275c5205f3f04581d-22891466`, // Substitua pelo seu token de acesso
      },
      body: JSON.stringify({
        card_number: cardNumber,
        security_code: cvv,
        expiration_month: expiration.split('/')[0],
        expiration_year: `20${expiration.split('/')[1]}`,
        cardholder: { name: holderName },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Token gerado com sucesso
      console.log('Token gerado:', data.id);
        console.log(JSON.stringify({
            transaction_amount: 100,  // Valor do pagamento, por exemplo, 100 reais
            token: data.id,  // Token gerado
            description: 'Compra de Teste',  // Descrição do pagamento
            installments: 1,  // Número de parcelas
            payment_method_id: 'master',  // Método de pagamento (exemplo: 'master', 'visa', etc.)
            payer: {
              email: 'cliente@teste.com',  // Email do cliente
            },
          }));
      // Agora, gerar o pagamento
      const paymentResponse = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer TEST-2442398020518072-030911-c8d99899e5d57fe275c5205f3f04581d-22891466`, // Substitua pelo seu token de acesso
          'X-Idempotency-Key': uuidv4(),
        },
        body: JSON.stringify({
          transaction_amount: 100,  // Valor do pagamento, por exemplo, 100 reais
          token: data.id,  // Token gerado
          description: 'Compra de Teste',  // Descrição do pagamento
          installments: 1,  // Número de parcelas
          payment_method_id: 'master',  // Método de pagamento (exemplo: 'master', 'visa', etc.)
          payer: {
            email: 'cliente@teste.com',  // Email do cliente
          },
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentResponse.ok) {
        // Verificar o status do pagamento
        const status = paymentData.status;
        let statusMessage = '';

        switch (status) {
          case 'approved':
            statusMessage = 'Compra aprovada com sucesso!';
            break;
          case 'rejected':
            statusMessage = 'Compra rejeitada. Verifique os dados do cartão.';
            break;
          case 'pending':
            statusMessage = 'A compra está pendente.';
            break;
          case 'cancelled':
            statusMessage = 'A compra foi cancelada.';
            break;
          default:
            statusMessage = 'Status desconhecido da compra.';
        }

        // Enviar a resposta com o status
        res.json({ paymentId: paymentData.id, status: status, message: statusMessage });
      } else {
        res.status(400).json({ error: paymentData.error });
      }
    } else {
      res.status(400).json({ error: data.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar token ou pagamento no Mercado Pago' });
  }
};


module.exports = { gerarToken };
