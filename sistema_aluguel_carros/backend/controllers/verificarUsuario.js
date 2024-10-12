const database = require("./DB/database");

class UserCodeExist {
  static #uuid = require("uuid");
  static #cache = require('../cache/cache');
  static #config = require('../config.json')
  static router(req, res) {
    try {
      const { codigo } = req.body;
      UserCodeExist.#verificarCode(codigo);

      const getDadosNoCache = UserCodeExist.#verificarCache(res, codigo);
      const {changes} = UserCodeExist.#insertValueDb(getDadosNoCache);

      if (changes > 0) {
        return res.cookie('token',  UserCodeExist.#jwtGerar(),{ 
          httpOnly: true, 
          secure: false,  
          maxAge: 3600000
        })
        
        .status(200).send({
          msg: "O código informado é válido e corresponde ao código salvo. Você pode usá-lo para gerar o JWT.",
          info: {
            status: "Código válido",
            acao: "Verificação de código",
            usuarioCadastrado: true,
            token: UserCodeExist.#jwtGerar()
          },
        });
      };

    } catch (error) {
      res.status(500).send({
        msg: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
        info: {
          status: "Erro interno",
          acao: "Operação falhou",
          recomendacao: "Se o problema persistir, entre em contato com o suporte.",
        },
      });
    }finally{
      database.dbQuery().close()
    }
  };

  static #verificarCache(res, codigo) {
    const cacheGetDado = this.#cache.get('dados')
    

    if (cacheGetDado === undefined) {
      return res.status(410).send({
        msg: "O tempo de expiração para confirmar o código passou. O código é válido por apenas 5 minutos.",
        info: {
          status: "Código expirado",
          acao: "Confirmação de código",
          recomendacao: "Por favor, solicite um novo código para continuar.",
        },
      });
    }

    const { code } = cacheGetDado;

    if (code == codigo) {
      return cacheGetDado;
    };

    return res.status(400).send({
      msg: "O código fornecido está incorreto. Por favor, verifique e tente novamente.",
      info: {
        status: "Código inválido",
        acao: "Confirmação de código",
        recomendacao: "Certifique-se de que o código digitado está correto ou solicite um novo código.",
      },
    });  
    
  };

  static #verificarCode(code, res) {
    if (!code) {
      return res.status(401).send({ err: "O codigo nao foi enviado." });
    };
  }

  static #insertValueDb(cache) {
    const { nome, email, senha, telefone, cpf } = cache;
    const query = "INSERT INTO PESSOAS(NOME, EMAIL_USUARIO , SENHA, TELEFONE,CPF) VALUES(?, ? , ? , ?, ?)";

    return database.dbQuery()
    .prepare(query)
    .run(nome, email, senha, telefone, cpf);
  };

  static #jwtGerar() {
    const jwt = require("jsonwebtoken");
    const idGerar = this.#uuid.v7();
    return jwt.sign({idGerar}, this.#config.keyJwt, { expiresIn: "60s" });
  };
};

module.exports = UserCodeExist;