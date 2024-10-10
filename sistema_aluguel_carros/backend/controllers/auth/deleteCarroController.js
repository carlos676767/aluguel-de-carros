class DeleteCarroController {
  static #db = require("../DB/database");
  static #fs = require("fs");
  static #path = require("path");

  static routerCar(req, res) {
    try {
      const id = req.params.id;
      DeleteCarroController.verificarId(id, req.params);
      DeleteCarroController.deletarCarro(id, res);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static verificarId(id, query) {
    if (!id || !query) {
        throw new Error(  "O ID ou o parâmetro de consulta (query) fornecido é inválido ou não foi informado. Por favor, verifique os dados e forneça valores válidos."  );
     }      
  }

  static deletarCarro(id, res) {
    try {
      const query = this.#db.dbQuery().prepare("SELECT * FROM CARROS WHERE ID = ?").get(id);

      if (query != undefined) {

        const { IMAGEM } = query;
        this.#fs.unlinkSync(this.#path.join(__dirname, "../../image", IMAGEM));

        const { changes } = this.#db.dbQuery().prepare("DELETE FROM CARROS WHERE ID = ?").run(id);

        if (changes > 0) {
          res.status(200).send({
            msg: `O carro do ID  ${id} foi deletado com sucesso.`,
            info: {
              idCarro: id,
              status: true,
            },
          });
        }

        this.#db.dbQuery().close()
        return;
      }

      res.status(404).send({
        msg: `Nenhum carro foi encontrado com o ID ${id}. Verifique se o ID está correto.`,
        info: {
          idCarro: id,
          status: "Não encontrado",
        },
      });

      this.#db.dbQuery().close();
    } catch (error) {
      res.status(500).send({
        msg: "Ocorreu um erro interno ao tentar a pessoa. Tente novamente mais tarde.",
        error: error.message,
      });

      this.#db.dbQuery().close();
    }
  }
}

module.exports = DeleteCarroController;
