const knex = require("../database/conexao");

const visualizarPostagem = async (req, res) => {
  try {
    const listarPostagem = await knex.select().from("postagem");

    if (listarPostagem.length <= 0) {
      return res.status(404).send({ message: "Tema não encontrado." });
    }
    return res.status(200).json(listarPostagem);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const visualizarPostagemId = async (req, res) => {
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
};

const adicionarPostagem = async (req, res) => {
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
};

const atualizarPostagem = async (req, res) => {
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
};

const apagarPostagem = async (req, res) => {
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
};
module.exports = {
  visualizarPostagem,
  visualizarPostagemId,
  adicionarPostagem,
  atualizarPostagem,
  apagarPostagem,
};
