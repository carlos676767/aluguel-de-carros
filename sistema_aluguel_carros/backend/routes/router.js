const express = require("express").Router();

const AtulizarCarroController = require("../controllers/auth/AtulizarCarroController");
const {
  Multer,
  Carro,
} = require("../controllers/auth/CadastrodeCarrosController");
const deleteCarroController = require("../controllers/auth/deleteCarroController");
const { UsuarioAuthenticator, Usuarios, UsuarioConsultar } = require("../controllers/auth/GestãodeUsuáriosController");
const Usuario = require("../controllers/usuarioController");

express.post('/api/usuarios', Usuario.router)
express.post('/api/codigoConfirmar', Usuario.adicionarUsersDatabase)

express.use(Carro.verificarAcesso)
express.post("/api/carros",Multer.multerConfig().single("file"),Carro.router);

express.use(UsuarioAuthenticator.verificarAcesso)
express.get('/api/usuarios', UsuarioConsultar.rotaGetUsers)

express.use(UsuarioAuthenticator.verificarAcesso)
express.delete('/api/usuariosDelete/:id', Usuarios.rotaApagarUsuarios)


express.use(deleteCarroController.verificarAcesso)
express.delete('/api/carros/:id', deleteCarroController.routerCar)

express.use(AtulizarCarroController.verificarAcesso)
express.put('/api/carros', AtulizarCarroController.router)


module.exports = express;
