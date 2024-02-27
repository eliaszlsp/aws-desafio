const knex = require("../database/conexao");

const visualizarPostagem = async (req, res) => {
  try {
    const listarPostagem = await knex.select().from("postagem");

    if (listarPostagem.length <= 0) {
      return res.status(404).send({ message: "postagem não encontrado." });
    }
    return res.status(200).json(listarPostagem);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const visualizarPostagemId = async (req, res) => {
  const { id } = req.params;
  try {
    const listarPostagem = await knex
      .select()
      .from("postagem")
      .where({ id })
      .first();
    if (!listarPostagem) {
      return res.status(404).send({ message: "postagem não encontrado." });
    }

    const listarTema = await knex
      .select()
      .from("tema")
      .where({ id: listarPostagem.tema_id });
    const listarUsuario = await knex
      .select()
      .from("usuario")
      .where({ id: listarPostagem.usuario_id });

    listarPostagem.tema_id = listarTema;
    listarPostagem.usuario_id = listarUsuario;

    return res.status(200).json(listarPostagem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const adicionarPostagem = async (req, res) => {
  const { titulo, texto, tema_id, usuario_id } = req.body;
  const data = new Date();

  if (!titulo || titulo.length < 5) {
    return res.status(400).json({
      message: "O título é obrigatório e deve ter pelo menos 5 caracteres.",
    });
  }
  if (!texto || texto.length < 10) {
    return res.status(400).json({
      message: "O texto é obrigatório e deve ter pelo menos 10 caracteres.",
    });
  }
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
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao criar a postagem." });
  }
};

const atualizarPostagem = async (req, res) => {
  const { titulo, texto, tema_id, usuario_id } = req.body;
  const { id } = req.params;
  const data = new Date();

  if (!titulo || titulo.length < 5) {
    return res.status(400).json({
      message: "O título é obrigatório e deve ter pelo menos 5 caracteres.",
    });
  }
  if (!texto || texto.length < 10) {
    return res.status(400).json({
      message: "O texto é obrigatório e deve ter pelo menos 10 caracteres.",
    });
  }

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
      return res.status(404).send({ message: "postagem não encontrado." });
    }

    await knex("tema").where({ id }).delete();

    res.status(200).send({ message: " Postagem deletada com sucesso!" });
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
