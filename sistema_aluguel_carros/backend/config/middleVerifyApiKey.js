class Middlare {
  /**
   * Middleware para verificar a chave de acesso da API.
   *
   * @param {Object} req - O objeto da requisição.
   * @param {Object} res - O objeto da resposta.
   * @param {Function} next - Função para passar o controle para o próximo middleware.
   */
  static verifyValue(req, res, next) {
    const Database = require(`../controllers/DB/database`);
    const acesso = req.query.acesso;

    if (!acesso) {
      return res.status(401).send({
        msg: "Acesso não autorizado. Verifique o parâmetro 'acesso'.",
      });
    }

    const database = Database.dbQuery()
      .prepare(`SELECT * FROM APISKEY WHERE API_KEY = ?`)
      .get(acesso);

    if (database === undefined) {
      return res.status(400).send({
        error: "O valor do parâmetro passado não foi encontrado. Coloque outro valor no parâmetro.",
        info: {
          status: "Parâmetro ausente",
          acao: "Verificação de parâmetro",
          recomendacao: "Verifique se o parâmetro 'acesso' está correto e tente novamente.",
        },
      });
    }

    const { API_KEY } = database;

    if (API_KEY === acesso) {
      next();
      return;
    }

    res.status(401).send({
      error:  "O código da chave fornecido não corresponde ao registrado no banco.",
      info: {
        status: "Chave inválida",
        acao: "Verificação de chave API",
        recomendacao: "Certifique-se de que a chave API inserida está correta e tente novamente.",
      },
    });
  }
}

module.exports = Middlare;
