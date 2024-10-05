const express = require("express").Router();
const {
  Multer,
  Carro,
} = require("../controllers/auth/CadastrodeCarrosController");
const Usuarios = require("../controllers/auth/GestãodeUsuáriosController");


express.post("/api/carros",Multer.multerConfig().single("file"),Carro.router);
express.use(Usuarios.verificarAcesso)
express.get('/api/usuarios', Usuarios.rotaGetUsers)
module.exports = express;
