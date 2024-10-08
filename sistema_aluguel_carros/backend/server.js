class Express {
  static api = require("express");
  static bodyparser = require("body-parser");
  static router = require("./routes/router");
  static expressCponnect() {
    const app = this.api();

    app.use(this.bodyparser.json());

    app.use(this.api.static("image"));
    app.use(this.router);
    app.set('view engine', 'pug')
    app.set('views', './template');
   
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`servidor rodando ${port}`);
      
    });
  }
}

Express.expressCponnect();
//mudar po caminho no cadastro da img



