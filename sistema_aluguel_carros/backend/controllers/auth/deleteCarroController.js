class DeleteCarroController {
  static db = require("../DB/database");
  static fs = require("fs");
  static path = require("path");
  static verificarAcesso(req, res, next) {
    const configJson = require("../../niveisAcesso.json");
    const acesso = req.query.acesso;

    if (!acesso || acesso !== configJson.admin) {
      res.status(401).send({
        msg: "Acesso não autorizado. Verifique se o parâmetro fornecido está correto ou se você possui as credenciais adequadas.",
      });
      return;
    }

    next();
  }

  static routerCar(req, res) {
    try {
      const id = req.params.id;
      DeleteCarroController.verificarId(id);
      DeleteCarroController.deletarCarro(id, res);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static verificarId(id) {
    if (!id) {
      throw new Error(
        "O ID fornecido é inválido ou não foi informado. Por favor, forneça um ID válido."
      );
    }
  }

  static deletarCarro(id, res) {
    try {
      const query = this.db.dbQuery().prepare("SELECT * FROM CARROS WHERE ID = ?").get(id);

      if (query != undefined) {

        const { IMAGEM } = query;
        this.fs.unlinkSync(this.path.join(__dirname, "../../image", IMAGEM));

        const { changes } = this.db.dbQuery().prepare("DELETE FROM CARROS WHERE ID = ?").run(id);

        if (changes > 0) {
          res.status(200).send({
            msg: `O carro do ID  ${id} foi deletado com sucesso.`,
            info: {
              idCarro: id,
              status: true,
            },
          });
        }
        
        this.db.dbQuery().close()
        return;
      }

      res.status(404).send({
        msg: `Nenhum carro foi encontrado com o ID ${id}. Verifique se o ID está correto.`,
        info: {
          idCarro: id,
          status: "Não encontrado",
        },
      });

      this.db.dbQuery().close();
    } catch (error) {
      res.status(500).send({
        msg: "Ocorreu um erro interno ao tentar a pessoa. Tente novamente mais tarde.",
        error: error.message,
      });

      this.db.dbQuery().close();
    }
  }
}

module.exports = DeleteCarroController;
