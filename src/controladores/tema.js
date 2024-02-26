const knex = require("../database/conexao");

const visualizarTema = async (req, res) => {
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
};

const visualisarTemaPorId = async (req, res) => {
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
};

const adicionarTema = async (req, res) => {
  const { descricao, postagem_id } = req.body;
  if (!descricao || descricao.length < 3) {
    return res.status(400).send({
      message: "A descrição é obrigatória e deve ter pelo menos 3 caracteres.",
    });
  }
  try {
    const inserindoTema = await knex("tema").insert({
      descricao,
      postagem_id,
    });

    res.status(201).send({ message: "Tema criado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).send({ message: "Ocorreu um erro ao criar o tema." });
  }
};

const atualizarTema = async (req, res) => {
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
};
const apagarTema = async (req, res) => {
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
  visualizarTema,
  visualisarTemaPorId,
  adicionarTema,
  atualizarTema,
  apagarTema,
};
