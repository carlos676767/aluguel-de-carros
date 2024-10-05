class Express {
  static api = require("express");
  static bodyparser = require("body-parser");
  static router = require("./routes/router");
  static expressCponnect() {
    const expresApi = this.api();

    expresApi.use(this.bodyparser.json());

    expresApi.use(this.api.static("image"));
    expresApi.use(this.router);

    const port = process.env.PORT || 8080;
    expresApi.listen(port, () => {
      console.log(`servidor rodando ${port}`);
    });
  }
}

Express.expressCponnect();
//mudar po caminho no cadastro da img
