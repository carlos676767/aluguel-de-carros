const codigoEmail = require("./emailConfirmarSenha");

class NodeMailer {
  static #email = require("nodemailer");
  static config = require('../config.json')
  static #nodeMaileConfig() {
    return this.#email.createTransport({
      service: "Yahoo",
      auth: {
        user: this.config.email,
        pass: this.config.senha,
      },
    });
  };

  static async enviarEmail(paraQuem,code) {
    return await this.#nodeMaileConfig().sendMail({
      from: this.config.email,
      to: paraQuem,
      subject: "✉️ Confirmação de E-mail Necessária!",
      html: codigoEmail(code),
    });
  };

  
  static randomCod(){
    return  Array.from(Array(10).keys()).map(data => Math.floor(Math.random() * 50)).join('')
  };
};

module.exports = NodeMailer