class SenhaController {
  static dtb = require("./DB/database");
  
  static async routerDatabaseEmail(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).send({
          msg: "O e-mail não foi informado.",
          info: {
            status: "E-mail não fornecido",
            acao: "Verificação de e-mail",
            recomendacao: "Por favor, forneça um endereço de e-mail válido.",
          },
        });
      }

      const emailExiste = await SenhaController.verificarEmailExiste(email);
      if (emailExiste) {
        const tk = SenhaController.gerarJwt(email)
        //agora falta a parte de enviar o email com a tela para o usuario e pedir a senha antiga + a nova.
        
       
        return res.status(200).send({
          msg: "Código de verificação enviado para o e-mail.",
          info: {
            status: "Código enviado",
            acao: "Envio de código de verificação",
            recomendacao: "Verifique sua caixa de entrada para o código.",
          },
        });
      }

      res.status(404).send({
        msg: "O e-mail informado não está cadastrado.",
        info: {
          status: "E-mail não encontrado",
          acao: "Verificação de e-mail",
          recomendacao: "Verifique se o e-mail está correto ou cadastre-se.",
        },
      });

    } catch (error) {  
      return res.status(500).send({
        msg: "Erro interno do servidor.",
        info: {
          status: "Erro no servidor",
          acao: "Verificação de e-mail",
          recomendacao: "Tente novamente mais tarde.",
        },
      });
    }
  }


  static async verificarEmailExiste(email) {
    const query = "SELECT * FROM PESSOAS WHERE EMAIL_USUARIO = ?";
    const procurarEmail =  this.dtb.dbQuery().prepare(query).get(email);
    return Boolean(procurarEmail);
  }


  static gerarJwt(email){
    const tokenJwt = require('jsonwebtoken');
    const config = require('../config.json');
    return tokenJwt.sign({email}, config.keyJwt, {expiresIn: '5m'});
  }
}

module.exports = SenhaController