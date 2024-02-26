-- Active: 1695257636860@@127.0.0.1@5432@create data base
CREATE TABLE tema (
    id SERIAL PRIMARY KEY, descricao TEXT NOT NULL CHECK (LENGTH(descricao) >= 3), postagem_id TEXT NOT NULL
);

CREATE TABLE postagem (
    id SERIAL PRIMARY KEY, titulo TEXT NOT NULL CHECK (LENGTH(titulo) >= 5), texto TEXT NOT NULL CHECK (LENGTH(texto) >= 10), data timestamptz, tema_id INT NOT NULL, usuario_id INT NOT NULL, FOREIGN KEY (tema_id) REFERENCES tema (id), FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, foto TEXT, postagem_id TEXT
);