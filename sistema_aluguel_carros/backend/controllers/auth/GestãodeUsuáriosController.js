class Usuarios {
  static db = require("../DB/database");
  
  static verificarAcesso(req,res, next){
    const  configJson = require('../../niveisAcesso.json')
    const acesso = req.query.acesso

    if (!acesso || acesso !== configJson.admin) {
        res.status(401).send({ msg: 'Acesso não autorizado, verifique o parâmetro.' });
        return;
    }

    next()
  }


  static rotaGetUsers(req, res) {
    try {
      const getUsers = Usuarios.mostrarUsuarios();
      res.send({users:getUsers, usersGet:true });
    } catch (error) {
      res.status(400).send(error. message);
    }
  }

  static mostrarUsuarios() {
    const selecioneUsers = this.db.dbQuery().prepare("select * from PESSOAS ORDER BY PESSOAS.NOME ASC");
    const getFullUsers = selecioneUsers.all();

    Usuarios.validacoesGetUsers(getFullUsers);
    
    const valoreEmMinusculosDatabase = getFullUsers.reduce((acc, data) => {
        Object.keys(data).forEach(key => {
            acc[key.toLowerCase()] = data[key]; 
        });
        return acc; 
    }, {});
    
    return valoreEmMinusculosDatabase
  }

  
  static validacoesGetUsers(value) {
    if (value == []) {
      throw new Error( "Não há usuários cadastrados no sistema. Por favor, cadastre novos usuários." );
    }

  }

  static rotaApgarUsers(req, res) {
    
  }

  static administrarUser() {

  }
}

module.exports = Usuarios;
