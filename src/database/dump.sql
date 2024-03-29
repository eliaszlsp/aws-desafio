-- Active: 1695257636860@@127.0.0.1@5432@create data base
CREATE TABLE tema (
    id SERIAL PRIMARY KEY, descricao TEXT NOT NULL CHECK (LENGTH(descricao) >= 3), postagem_id TEXT NOT NULL
);

CREATE TABLE Postagem (
    id SERIAL PRIMARY KEY, titulo VARCHAR(255) NOT NULL CHECK (LENGTH(titulo) >= 5), texto TEXT NOT NULL CHECK (LENGTH(texto) >= 10), data TIMESTAMP DEFAULT CURRENT_TIMESTAMP, usuario_id INTEGER REFERENCES Usuario (id) ON DELETE CASCADE, tema_id INTEGER
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, foto TEXT, postagem_id TEXT
);