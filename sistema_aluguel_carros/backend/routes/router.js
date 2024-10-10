const express = require("express").Router();

const Middlare = require("../config/middleVerifyApiKey");
const AtulizarCarroController = require("../controllers/auth/AtulizarCarroController");
const {
  Multer,
  Carro,
} = require("../controllers/auth/CadastrodeCarrosController");
const deleteCarroController = require("../controllers/auth/deleteCarroController");
const { UsuarioAuthenticator, Usuarios, UsuarioConsultar } = require("../controllers/auth/GestãodeUsuáriosController");
const MercadoPagoPagamentos = require("../controllers/pagamentoController");
const SenhaController = require("../controllers/trocarSenhaController");
const Usuario = require("../controllers/usuarioController");
const UserCodeExist = require("../controllers/verificarUsuario");

express.post('/api/usuarios', Usuario.router)
express.post('/api/codigoConfirmar', UserCodeExist.router)
express.post('/pagamentos',MercadoPagoPagamentos.routerPay)
express.post('/webhook', MercadoPagoPagamentos.routerWebhook)
express.post('/verificarEmail', SenhaController.routerDatabaseEmail)
express.use(Middlare.verifyValue);
express.post("/api/carros",Multer.multerConfig().single("file"),Carro.router);

express.use(Middlare.verifyValue)
express.get('/api/usuarios', UsuarioConsultar.rotaGetUsers)

express.use(Middlare.verifyValue)
express.delete('/api/usuariosDelete/:id', Usuarios.rotaApagarUsuarios)


express.use(Middlare.verifyValue)
express.delete('/api/carros/:id', deleteCarroController.routerCar)

express.use(Middlare.verifyValue)
express.put('/api/carros', AtulizarCarroController.router)


module.exports = express;
