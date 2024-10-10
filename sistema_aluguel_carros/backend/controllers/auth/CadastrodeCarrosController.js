
class Multer {
  static #multer = require("multer");
  static #id = require("uuid");
  static #path = require("path");

  static multerConfig() {
    const multerRequire = this.#multer.diskStorage({
      destination: (req, file, caminho) => {
        caminho(null, "E://aluguel de carros//sistema_aluguel_carros//backend//image");
      },

      filename: (req, file, callback) => {
        callback(null, this.#id.v7() + this.#path.extname(file.originalname));
      },
    });

    return this.#multer({ storage: multerRequire, fileFilter: this.fileFilter });
  }

  static fileFilter(req, file, callback) {
    const caminho = require('path')
    const extensaoArquivo = caminho.extname(file.originalname)

    const extensoesPremtidas = ['.jpeg', '.jpg', '.png'];
    if (!extensoesPremtidas.includes(extensaoArquivo)) {
      callback(new Error("Ocorreu um erro ao fazer o upload da imagem. Certifique-se de que a imagem está no formato correto (.jpg, .jpeg, .png) e tente novamente."), false)
    }

    return callback(null, true)
  }
}


class Carro {
  static #sql = require("../DB/database")
  static #fs = require('fs')
  static #path = require("path")

  static router(req, res) {
    try {
      const { modelo, marca, precoDiaria, disponibilidade, PLACA, ANO } = req.body;
      console.log(req.body, `dados`);
      
      Carro.validacoesCarro(modelo, marca, precoDiaria, disponibilidade, PLACA, ANO, req.file)
      Carro.adicionarCarrosDb(modelo, marca, precoDiaria, req.file.filename, disponibilidade, PLACA, ANO, res)
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static validacoesCarro(modelo, marca, precoDiaria, disponibilidade, PLACA, ANO, file) {
    if (!modelo || !marca || !ANO || !precoDiaria || !disponibilidade || !PLACA) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    if (!file) {
      throw new Error("Nenhum arquivo foi enviado.")
    }

    const data = new Date();
    const anoAtual = data.getFullYear();
    if (ANO < 1886 || ANO > anoAtual) {
      throw new Error(`O ano do veículo precisa ser entre 1886 e ${anoAtual}.`);
    }

    if (precoDiaria <= 0) {
      throw new Error("O preço da diária precisa ser um valor positivo.");
    }
  }

  static adicionarCarrosDb(modelo, marca, precoDiaria, IMAGEM, disponibilidade, PLACA, ANO, res) {
    try {
      const query = 'INSERT INTO CARROS (MODELO, MARCA,PRECO, IMAGEM,DISPONIBILIDADE,PLACA,ANO) VALUES(?,?,?,?,?,?,?)'
      const iserirValor = this.#sql.dbQuery().prepare(query)

      const { changes } = iserirValor.run(modelo, marca, precoDiaria, IMAGEM, disponibilidade, PLACA, ANO)

      if (changes == 1) {
        res.status(200).send({
          msg: "Carro cadastrado com sucesso!",
          info: {
            status: "Cadastrado",
            descricao: "O carro foi cadastrado no sistema com sucesso.",
          },
        });

        this.#sql.dbQuery().close()
        return
      }

      Carro.deleteImg(IMAGEM)
      res.status(500).send({
        msg: "Ocorreu um erro inesperado ao tentar cadastrar o carro. Por favor, tente novamente mais tarde.",
        info: {
          status: "Erro inesperado",
          acao: "Cadastro de carro",
          recomendacao: "Verifique os dados fornecidos e tente novamente.",
        },
      });

    } catch (error) {

      res.status(500).send({
        msg: "Ocorreu um erro ao cadastrar um carro,  Tente novamente mais tarde.",
        error: error.message,
      });
      this.#sql.dbQuery().close()
    }
  }

  static deleteImg(img) {
    return this.#fs.unlinkSync(this.#path.join(__dirname, "../../image", img))
  }
};


module.exports = { Carro, Multer }