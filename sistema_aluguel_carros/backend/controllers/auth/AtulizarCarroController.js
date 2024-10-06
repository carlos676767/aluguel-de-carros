class AtulizarCarroController {
  static #sql = require("../DB/database");
  static verificarAcesso(req, res, next) {
    const configJson = require("../../niveisAcesso.json");
    const acesso = req.query.acesso;

    if (!acesso || acesso !== configJson.admin) {
      res
        .status(401)
        .send({ msg: "Acesso não autorizado, verifique o parâmetro." });
      return;
    }

    next();
  }

  static router(req, res) {
    try {
      const { id, coluna, novoValor } = req.body;
      console.log(req.body);

      AtulizarCarroController.#validacoes(id, coluna);
      const colunaEmMaisculo = coluna.toUpperCase().trim();

      AtulizarCarroController.dbAtualizar(id, colunaEmMaisculo, res, novoValor);
    } catch (error) {
      console.log(error);
    }
  }

  static #validacoes(id, coluna) {
    if (!id || !coluna) {
      throw new Error(
        "O ID ou a coluna fornecida são inválidos ou não foram informados. Por favor, forneça ambos os valores."
      );
    }

    if (id < 0) {
      throw new Error(
        "O ID fornecido não pode ser negativo. Por favor, forneça um ID válido que seja igual ou maior que zero."
      );
    }
  }

  static dbAtualizar(id, coluna, res, novoValor) {
    try {
      const query = `UPDATE CARROS SET ${coluna} = ? WHERE ID = ?`;
      const { changes } = this.#sql.dbQuery().prepare(query).run(novoValor, id);
      
      if (changes >= 1) {
        res.status(200).send({
          msg: `O carro do ID ${id} foi atualizado com sucesso.`,
          info: {
            idCarro: id,
            status: true,
          },
        });
        return;
      }

      res.status(400).send({
        msg: `Verifique se você digitou o ID correto, a coluna e o novo valor. Por favor, tente novamente.`,
        info: {
          idCarro: id,
          status: false,
        },
      });

    } catch (error) {
      res.status(500).send({
        msg: "Ocorreu um erro ao atualizar o carro,Verifique se você digitou o ID correto, a coluna e o novo valor. Por favor, tente novamente.",
        error: error.message,
      });
    }
  }
}

module.exports = AtulizarCarroController;
