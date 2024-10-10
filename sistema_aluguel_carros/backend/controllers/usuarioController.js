class Usuario {
  static db = require("./DB/database");
  static NodeMailer = require("../email/email");
  static cache = require("../cache/cache");
  static config = require("../config.json");

  static async router(req, res) {
    try {
      const { nome, email, senha, telefone, cpf } = req.body;
      Usuario.validacoes(nome, email, senha, telefone, cpf, res);
      await Usuario.colocarDadosEmCache(nome, email, senha, telefone, cpf, res);
    } catch (error) {
      res.status(400).send({
        msg: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        info: {
          status: "Erro do cliente",
          acao: "Operação falhou",
          recomendacao: "Verifique os dados inseridos e tente novamente. Se o problema persistir, entre em contato com o suporte.",
        },
      });      
    }
  }

  static validacoes(nome, email, senha, telefone, cpf, res) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexTelefone = /^\(?\+?55\)?\s?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}|\d{11}$/;

    if (!nome || !email || !senha || !telefone || !cpf) {
      return res.status(400).send({
        msg: "Todos os campos (nome, email, senha, telefone, cpf) são obrigatórios.",
        status: false,
      });
    }

    if (!regexEmail.test(email)) {
      return res.status(400).send({
        msg: "O e-mail fornecido não é válido.",
        emailValido: false,
      });
    }

    if (senha.length < 8 || !regexSenha.test(senha)) {
      return res.status(400).send({
        msg: `Atenção! A senha deve ter no mínimo 8 caracteres e conter letras maiúsculas e minúsculas.`,
        status: false,
      });
    }
    
    if (nome.length < 3) {
      return res.status(400).send({
        msg: `Atenção! O nome precisa ter no minimo tres de comprimento.`,
        status: false,
      });
    }

    if (!regexTelefone.test(telefone)) {
      return res.status(400).send({
        msg: `Atenção! O número de telefone deve estar no formato correto. Exemplos válidos: 11987654321.`,
        status: false,
      });
    }

    if (cpf.length < 11 || cpf.length > 11) {
      return res.status(400).send({
        msg: "O numero do cpf deve ter 11 digitos",
        status: false,
      });
    }
  }

  static async colocarDadosEmCache(nome, email, senha, telefone, cpf, res) {
    try {
      const emailExiste = Usuario.verificarEmailExiste(email);
      
      if (emailExiste) {
        return res.status(400).send({
          msg: "O e-mail informado já está cadastrado. Por favor, use um e-mail diferente.",
          info: {
            status: "E-mail já existente",
            acao: "Cadastro de usuário",
            recomendacao:  "Verifique seu e-mail ou escolha um e-mail alternativo.",
          },
        });
      }

      const code = this.NodeMailer.randomCod();

      
      const { response } = await this.NodeMailer.enviarEmail(email, code);

      if (response.match(/250\sOK/)[0]) {
        const dadosUser = { nome, email, senha, telefone, cpf, code };
        this.cache.set('dados', dadosUser, 3000)
       
        return res.status(200).send({
          msg: "O e-mail de confirmação foi enviado com sucesso.",
          info: {
            status: "E-mail enviado",
            acao: "Envio de e-mail de confirmação",
            recomendacao: "Verifique sua caixa de entrada e, se necessário, a pasta de spam.",
          },
        });
      }

    } catch (error) {
      console.log(error);
      
      res.status(500).send({
        msg: "Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente mais tarde.",
        info: {
          status: "Erro ao enviar e-mail",
          acao: "Envio de e-mail",
          recomendacao: "Verifique os dados do servidor de e-mail e tente novamente.",
        },
      });
    }
  }

  static verificarEmailExiste(email) {
    return Boolean(
      this.db.dbQuery().prepare(`SELECT * FROM PESSOAS WHERE EMAIL_USUARIO = ?`).get(email)
    );
  }


}

module.exports = Usuario;