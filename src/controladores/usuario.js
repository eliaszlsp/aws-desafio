const knex = require("../database/conexao");

const visualizarUsuario = async (req, res) => {
  try {
    const listarUsuario = await knex.select().from("usuario");

    if (listarUsuario.length <= 0) {
      return res.status(404).send({ message: "usuario não encontrado." });
    }

    return res.status(200).json(listarUsuario);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const visualizarUsuarioID = async (req, res) => {
  const { id } = req.params;
  try {
    const listarUsuario = await knex
      .select()
      .from("usuario")
      .where({ id })
      .first();
    if (!listarUsuario) {
      return res.status(404).send({ message: "usuario não encontrado." });
    }
    const listarPostagem = await knex
      .select()
      .from("postagem")
      .where({ usuario_id: id });
    console.log(listarUsuario);
    listarUsuario.postagem_id = listarPostagem;
    return res.status(200).json(listarUsuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
};
const adicionarUsuario = async (req, res) => {
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
};

const atualizarUsuario = async function (req, res) {
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
};

const apagarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExistente = await knex("usuario").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const deletarUsuario = await knex("usuario").where({ id }).del();

    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao deletar o usuário." });
  }
};

module.exports = {
  visualizarUsuario,
  visualizarUsuarioID,
  adicionarUsuario,
  atualizarUsuario,
  apagarUsuario,
};
