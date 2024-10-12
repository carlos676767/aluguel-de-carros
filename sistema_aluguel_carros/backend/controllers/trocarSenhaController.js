const myDatabase = require("./DB/database");
const tokenJwt = require("jsonwebtoken");
const config = require("../config.json");
class SenhaController {
  

  static async routerDatabaseEmail(req, res) {
    try {
      const emailEnviarTela = require("../email/emailTrocarSenhaConfig");
      const { email } = req.body;

      if (!email) {
        return res.status(400).send({
          msg: "O e-mail não foi informado.",
          info: {
            status: "E-mail não fornecido",
            acao: "Verificação de e-mail",
            recomendacao: "Por favor, forneça um endereço de e-mail válido.",
          },
        });
      }

      const emailExiste = await SenhaController.verificarEmailExiste(email);
      if (emailExiste) {
        const tk = SenhaController.gerarJwt(email);
        await emailEnviarTela.enviarEmail(email,`http://localhost:8080/paginaTrocarSenha.html?tk=${tk}`   );
        return res.status(200).send({
          msg: "Código de verificação enviado para o e-mail.",
          info: {
            status: "Código enviado",
            acao: "Envio de código de verificação",
            recomendacao: "Verifique sua caixa de entrada para o código.",
          },
        });
      }

      res.status(404).send({
        msg: "O e-mail informado não está cadastrado.",
        info: {
          status: "E-mail não encontrado",
          acao: "Verificação de e-mail",
          recomendacao: "Verifique se o e-mail está correto ou cadastre-se.",
        },
      });
    } catch (error) {
      return res.status(500).send({
        msg: "Erro interno do servidor.",
        info: {
          status: "Erro no servidor",
          acao: "Verificação de e-mail",
          recomendacao: "Tente novamente mais tarde.",
        },
      });
    }finally{
      myDatabase.dbQuery().close()
    }
  }

  static async verificarEmailExiste(email) {
    const query = "SELECT * FROM PESSOAS WHERE EMAIL_USUARIO = ?";
    const procurarEmail = myDatabase.dbQuery().prepare(query).get(email);
    return Boolean(procurarEmail);
  }

  static gerarJwt(email) {
    return tokenJwt.sign({ email }, config.keyJwt, { expiresIn: "30m" });
  }
}

class TrocarSenha  {
  static  middlareVerificarTaoken(req, res,next) {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    
    tokenJwt.verify(token, config.keyJwt, (err, sucess) => {
      if (err) {
       return res.send({msg:"O tempo para trocar a senha expirou. O limite de tempo é de 5 minutos."})
      }

      const {email} = sucess
      
      const query ='SELECT * FROM PESSOAS WHERE EMAIL_USUARIO = ?'
      const {EMAIL_USUARIO} =  myDatabase.dbQuery().prepare(query).get(email)

      req.email = EMAIL_USUARIO
      next()
    });
  }

  static async routerTrocarSenha(req, res) {
    try {
      const { senha, confirmarSenha } = req.body;
      const email = req.email
      console.log(email, 'value passou');
      
     
      
      
      TrocarSenha.validacoes(senha, confirmarSenha);
      TrocarSenha.trocarSenha(email, senha, res)
    } catch (error) {
    console.log(error);
    
      
      res.status(400).send({ msg: error.message });
    };
  };

  //Carlossilva#3235%

  static trocarSenha(email,senha,res){
    const query =`UPDATE PESSOAS SET SENHA =  ? WHERE EMAIL_USUARIO = ?`
    console.log(email,senha);
    
    const {changes} = myDatabase.dbQuery(query)
    .prepare(query).run(senha,email)
    
    if (changes >= 1) {
     return res.status(200).send({
        msg: "Senha atualizada com sucesso.",
        info: { 
          status: "Sucesso",
          acao: "Continuar",
          recomendacao: "Sua senha foi atualizada com sucesso. Você pode prosseguir com suas operações ou entrar em contato com o suporte se precisar de ajuda.",
          erro: null,
        },
      });   
    }

    res.status(400).send({
      msg: "Ocorreu um erro ao trocar a senha.",
      info: {
        status: "Erro ao processar",
        acao: "Refazer pedido",
        recomendacao: "Houve um erro ao tentar trocar sua senha. Por favor, tente novamente e, se o problema persistir, entre em contato com o suporte.",
        erro: "Falha na troca da senha",
      },
    });
  }

  static validacoes(senha, novaSenha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (senha !== novaSenha) {
      throw new Error("As senhas não coincidem. Por favor, verifique e tente novamente." );
    }

    if (!senha || !novaSenha) {
      throw new Error("Todos os campos de senha devem ser preenchidos.")    }

    if (senha.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }

    if (!regex.test(senha)) {
      throw new Error("A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial." );
    }
  };
};

module.exports =  {SenhaController, TrocarSenha } ;