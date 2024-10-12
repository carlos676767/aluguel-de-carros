const { MercadoPagoConfig, Payment } = require("mercadopago");

class MercadoPagoPagamentos {
  static config = require("../config.json");


  static mpCobfig() {
    const novopay = new MercadoPagoConfig({
      accessToken: this.config.tokenMp,
      options: { timeout: 5000 },
    });
    const pagamento = new Payment(novopay);
    return pagamento
  }


  static payValues(valor){
      const body = {
        transaction_amount: valor,
        description: `produtos`,
        payment_method_id: "pix",
        payer: {
          email: "lacopo6367@esterace.com",
        },
      }
      return body
  }

  static async routerPay(req, res) {
    try {
      if (!req) {
       return  res.status(200).send({
          msg: "O valor do pagamento nao fornecido.",
          info: {
            status: "Aguardando o valor pagamento.",
          },
        });
      }

      const { valor } = req.body;
      
      const body = MercadoPagoPagamentos.payValues(valor)
      const pagamento = await MercadoPagoPagamentos.mpCobfig().create({body})

      const {qr_code_base64, ticket_url} = pagamento.point_of_interaction.transaction_data
      
      res.status(200).send({
        msg: "O link de pagamento está disponível.",
        info: {
          status: "Aguardando pagamento",
          acao: "Confirmação de pagamento",
          recomendacao: "Clique no link fornecido para efetuar o pagamento. Caso tenha algum problema, entre em contato com o suporte.",
          pagamentoUrl: ticket_url
        },
      });

      
    } catch (error) {
      res.status(400).send({
        msg: "Não foi possível criar o pagamento.",
        info: {
          status: "Erro ao processar",
          acao: "Tentar novamente",
          recomendacao: "Ocorreu um erro ao tentar criar o pagamento. Por favor, tente novamente mais tarde ou entre em contato com o suporte.",
          erro: "Falha na criação do pagamento",
        },
      });
    }
  }


  static async routerWebhook(req, res) {
  try {
    const {data} = req.body
    const mercadoPago =  MercadoPagoPagamentos.mpCobfig()
    const getId = await mercadoPago.get({id: data.id})

    if (getId.status == 'approved') {
      console.log('aprovado');
    };
    
  } catch (error) {

  }
  
  }
}

module.exports = MercadoPagoPagamentos