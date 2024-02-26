const express = require("express");
const knex = require("./database/conexao.js");

const rotas = express();

rotas.get("/tema/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const listarTema = await knex.select().from("tema").where({ id });

    if (listarTema.length <= 0) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }

    return res.status(200).json(listarTema);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

rotas.get("/tema", async (req, res) => {
  try {
    const listarTema = await knex.select().from("tema");

    return res.status(200).json(listarTema);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

rotas.get("/usuario/:id", async (req, res) => {
  try {
    const listarUsuario = await knex.select().from("usuario");

    if (listarUsuario.length <= 0) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }

    return res.status(200).json(listarUsuario);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

rotas.get("/usuario", async (req, res) => {
  try {
    const listarUsuario = await knex.select().from("usuario");

    return res.status(200).json(listarUsuario);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

rotas.get("/postagem/:id", async (req, res) => {
  try {
    const listarPostagem = await knex.select().from("postagem");
    console.log(listarPostagem, "oi");

    if (listarPostagem.length <= 0) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }
    return res.status(200).json(listarPostagem);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

rotas.get("/postagem", async (req, res) => {
  try {
    const listarPostagem = await knex.select().from("postagem");
    console.log(listandopostagem, "oi");
    return res.status(200).json(listarPostagem);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
rotas.post("/tema", async (req, res) => {
  const { descricao, postagem_id } = req.body;

  if (!descricao || descricao.length < 3) {
    return res.status(400).send({
      message: "A descrição é obrigatória e deve ter pelo menos 3 caracteres.",
    });
  }

  try {
    await knex("tema").insert({
      descricao,
      postagem_id,
    });

    res.status(201).send({ message: "Tema criado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao criar o tema." });
  }
});
rotas.post("/postagem", async (req, res) => {
  const { titulo, texto, data, tema_id, usuario_id } = req.body;
  try {
    const inserirDados = await knex("postagem")
      .insert({
        titulo,
        texto,
        data,
        tema_id,
        usuario_id,
      })
      .returning("*");

    res.status(201).json({ message: "Postagem criada com sucesso!" });
  } catch (error) {
    console.error(erro);
    res.status(500).json({ message: "Ocorreu um erro ao criar a postagem." });
  }
});
rotas.post("/usuario", async (req, res) => {
  const { nome, email, foto, postagem_id } = req.body;
  if (!email) {
    return res.status(400).send({ message: "O email é obrigatório." });
  }
  try {
    const usuarioExistente = await knex("usuario").where({ email }).first();
    if (usuarioExistente) {
      return res
        .status(400)
        .send({ message: "Já existe um usuário com este email." });
    }
    await knex("usuario").insert({
      nome,
      email,
      foto,
      postagem_id,
    });
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao criar o usuário." });
  }
});

rotas.put("/postagem/:id", async (req, res) => {
  const { titulo, texto, data, tema_id, usuario_id } = req.body;
  const { id } = req.params;

  try {
    const postagemExistente = await knex("postagem").where({ id }).first();

    if (!postagemExistente) {
      return res.status(404).send({ message: "Postagem não encontrada." });
    }

    await knex("postagem").where({ id }).update({
      titulo,
      texto,
      data,
      tema_id,
      usuario_id,
    });

    res.status(200).send({ message: "Postagem atualizada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .send({ message: "Ocorreu um erro ao atualizar a postagem." });
  }
});

rotas.put("/usuario/:id", async (req, res) => {
  const { nome, email, foto, postagem_id } = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).send({ message: "O email é obrigatório." });
  }

  try {
    const usuarioExistente = await knex("usuario").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const usuarioComEmailExistente = await knex("usuario")
      .where({ email })
      .first();

    if (usuarioComEmailExistente && usuarioComEmailExistente.id !== id) {
      return res
        .status(400)
        .send({ message: "Já existe um usuário com este email." });
    }

    await knex("usuario").where({ id }).update({
      nome,
      email,
      foto,
      postagem_id,
    });

    res.status(200).send({ message: "Usuário atualizado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .send({ message: "Ocorreu um erro ao atualizar o usuário." });
  }
});

rotas.put("/tema/:id", async (req, res) => {
  const { descricao, postagem_id } = req.body;
  const { id } = req.params;

  if (!descricao || descricao.length < 3) {
    return res.status(400).send({
      message: "A descrição é obrigatória e deve ter pelo menos 3 caracteres.",
    });
  }

  try {
    const temaExistente = await knex("tema").where({ id }).first();

    if (!temaExistente) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }

    await knex("tema").where({ id }).update({
      descricao,
      postagem_id,
    });

    res.status(200).send({ message: "Tema atualizado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao atualizar o tema." });
  }
});

rotas.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExistente = await knex("usuario").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    await knex("usuario").where({ id }).delete();

    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao deletar o usuário." });
  }
});

rotas.delete("/postagem/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postagemExistente = await knex("postagem").where({ id }).first();

    if (!postagemExistente) {
      return res.status(404).send({ message: "Postagem não encontrada." });
    }

    await knex("postagem").where({ id }).delete();

    res.status(200).send({ message: "Postagem deletada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao deletar a postagem." });
  }
});

rotas.delete("/tema/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const temaExistente = await knex("tema").where({ id }).first();

    if (!temaExistente) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }

    await knex("tema").where({ id }).delete();

    res.status(200).send({ message: "Tema deletado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao deletar o tema." });
  }
});

module.exports = rotas;
