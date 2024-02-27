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
rotas.get("/usuarios/:id", visualizarUsuarioID);
rotas.get("/usuarios", visualizarUsuario);
rotas.post("/usuarios", adicionarUsuario);
rotas.put("/usuarios/:id", atualizarUsuario);
rotas.delete("/usuarios/:id", apagarUsuario);

rotas.get("/postagens/:id", visualizarPostagemId);
rotas.get("/postagens", visualizarPostagem);
rotas.post("/postagens", adicionarPostagem);
rotas.put("/postagens/:id", atualizarPostagem);
rotas.delete("/postagens/:id", apagarPostagem);

rotas.get("/temas", visualizarTema);
rotas.get("/temas/:id", visualisarTemaPorId);
rotas.post("/temas", adicionarTema);
rotas.put("/temas/:id", atualizarTema);
rotas.delete("/temas/:id", apagarTema);

module.exports = rotas;
