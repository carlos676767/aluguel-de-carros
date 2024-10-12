class Email {
  static #email = require("nodemailer");
  static config = require("../config.json");
  
  static #nodeMaileConfig() {
    return this.#email.createTransport({
      service: "Yahoo",
      auth: {
        user: this.config.email,
        pass: this.config.senha,
      },
    });
  }

  static async enviarEmail(paraQuem, url) {
    const myEmail = require("../email/emailTrocarSenha");
    return await this.#nodeMaileConfig().sendMail({
      from: this.config.email,
      to: paraQuem,
      subject: "✉️ Troque sua senha",
      html: myEmail(url),
    });
  }
}


module.exports = Email