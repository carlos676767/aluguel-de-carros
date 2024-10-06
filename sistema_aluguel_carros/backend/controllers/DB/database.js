const { DatabaseSync } = require("node:sqlite");

class Database {
  static path = "E:/aluguel de carros/sistema_aluguel_carros/backend/controllers/DB/db.db";
  static dbQuery() {
    return new DatabaseSync(this.path)
  }
}

module.exports = Database;
