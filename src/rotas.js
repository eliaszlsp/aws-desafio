const express = require("express");
const knex = require("./database/conexao.js");

const rotas = express();

rotas.get("", async (req, res) => {
  //  const get = await knex.select().from("usuario").where({ id: "4" });

  const post = await knex("postagem").insert([
    {
      titulo: "arroz jojo",
      texto: "é bomaaaaaaaaa",
      usuario_id: "1",
      tema_id: "1",
    },
  ]);

  /* const post = await knex("tema").insert([
    {
      descricao: "comida",
    },
  ]); */

  /*   const post = await knex("usuario").insert([
    {
      nome: "elias",
      email: "elias@gmail.com",
      foto: " ",
    },
  ]);
 */
  console.log(post, "oi");

  return res.status(200).json({ message: "olá" });
});

module.exports = rotas;
