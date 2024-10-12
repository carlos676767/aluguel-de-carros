const Database = require("../DB/database")
const db = require("../DB/database");




class Usuarios {
  static rotaApagarUsuarios(req, res) {
    try {
      const id = req.params.id
      Usuarios.validacoes(id)
      Usuarios.apagarPerson(id, res)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

 
  static validacoes(id){
    if (!id) {
      throw new Error("Por favor envie um id.");
    }
  }

  static  async apagarPerson(id, res){
    try {
      const query = 'DELETE FROM PESSOAS WHERE Personid = ?'
      const {changes} = db.dbQuery().prepare(query).run(id)

      if (changes > 0) {
       return res.status(200).send({
          msg: `A pessoa do ID  ${id} foi deletado com sucesso.`,
          info: {
            idPessoa: id,
            status: true,
          },
        });
        
      }

      res.status(404).send({
        msg: `Nenhuma pessoa foi encontrado com o ID ${id}. Verifique se o ID está correto.`,
        info: {
          produtoId: id,
          status: "Não encontrado",
        },
      });
    } catch (error) {
      res.status(500).send({
        msg: "Ocorreu um erro interno ao tentar a pessoa. Tente novamente mais tarde.",
        error: error.message,
      });
      
    }finally{
      db.dbQuery().close()
    }
  }
}


class UsuarioConsultar {
  static rotaGetUsers(req, res) {
    try {
      const getUsers = Usuarios.mostrarUsuarios();

      res.status(200).send({
        message: "Lista de usuários obtida com sucesso.",
        data: {
          users: getUsers,
          usersFound: true,
        },
      });

    } catch (error) {
      res.status(400).send({
        msg: "Erro na requisição. Verifique os dados fornecidos.",
        error: {
          message: error.message,
          status: "Bad Request",
        },
      });

    }finally{
      db.dbQuery().close()
    }
  }

  static mostrarUsuarios() {
    const selecioneUsers = db.dbQuery().prepare("select * from PESSOAS ORDER BY PESSOAS.NOME ASC");
    const getFullUsers = selecioneUsers.all();
    Usuarios.validacoesGetUsers(getFullUsers);
    return getFullUsers
  }

  
  
  static validacoesGetUsers(value) {
    if (value == []) {
      throw new Error( "Não há usuários cadastrados no sistema. Por favor, cadastre novos usuários." );
    }
  }
}

module.exports = {UsuarioConsultar, Usuarios };
