const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const MERCADOPAGO_ACCESS_TOKEN = "APP_USR-2442398020518072-030911-308a19961c239525a0b23b0f89fd77f9-22891466";

const criarPreference = async (req, res) => {
    try {
      console.log(MERCADOPAGO_ACCESS_TOKEN);
        const preferenceData = {
            items: [
                {
                    title: "Reserva de Limite",
                    quantity: 1,
                    unit_price: 123,
                    currency_id: "BRL"
                }
            ],
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved"
        };

        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: JSON.stringify(preferenceData)
        });

        const responseData = await response.json();
        console.log(responseData.init_point);
        if (responseData.init_point) {
          console.log(responseData.init_point);
            res.json({ url: responseData.init_point });
        } else {
            console.error("Erro ao criar a preference:", responseData);
            res.status(500).json({ error: "Erro ao criar a preference" });
        }
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};


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
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`, // Substitua pelo seu token de acesso
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
          'Authorization': `Bearer TEST-2136294805922002-030823-6bfcd986b04c288d6f50fd25174e303d-22891466`, // Substitua pelo seu token de acesso
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
          }
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


const cancelarPagamento = async (paymentId) => {
  try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}/refunds`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
              'X-Idempotency-Key': uuidv4(),
          }       
      });

      const data = await response.json();
      console.log("🔴 Pagamento cancelado:", data);
      return data;
  } catch (error) {
      console.error("❌ Erro ao cancelar pagamento:", error);
  }
};

const capturarPagamento = async (req, res) => {
  console.log("🔔 Webhook recebido:", JSON.stringify(req.body, null, 2));

  const { action, data } = req.body;

  if (action === "payment.created" && data && data.id) {
      console.log("🔴 Iniciando cancelamento do pagamento:", data.id);
      await cancelarPagamento(data.id);
  }

  res.status(200).json({ message: "Webhook processado com sucesso" });
};



module.exports = { gerarToken , criarPreference, capturarPagamento,cancelarPagamento};
