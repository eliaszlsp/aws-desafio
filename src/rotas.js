const express = require("express");
const knex = require("./database/conexao.js");
const {
  visualisarTemaPorId,
  visualizarTema,
  adicionarTema,
  atualizarTema,
  apagarTema,
} = require("./controladores/tema.js");
const {
  visualizarUsuarioID,
  visualizarUsuario,
  adicionarUsuario,
  atualizarUsuario,
  apagarUsuario,
} = require("./controladores/usuario.js");
const {
  visualizarPostagem,
  visualizarPostagemId,
  adicionarPostagem,
  atualizarPostagem,
  apagarPostagem,
} = require("./controladores/postagem.js");

const rotas = express();
rotas.get("/usuario", visualizarUsuario);
rotas.get("/postagem", visualizarPostagem);
rotas.get("/tema", visualizarTema);

rotas.get("/usuario/:id", visualizarUsuarioID);
rotas.get("/postagem/:id", visualizarPostagemId);
rotas.get("/tema/:id", visualisarTemaPorId);

rotas.post("/usuario", adicionarUsuario);
rotas.post("/tema", adicionarTema);
rotas.post("/postagem", adicionarPostagem);

rotas.put("/usuario/:id", atualizarUsuario);
rotas.put("/postagem/:id", atualizarPostagem);

rotas.put("/tema/:id", atualizarTema);

rotas.delete("/usuario/:id", apagarUsuario);

rotas.delete("/postagem/:id", apagarPostagem);

rotas.delete("/tema/:id", apagarTema);

module.exports = rotas;
