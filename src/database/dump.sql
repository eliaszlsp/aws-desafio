-- Active: 1695257636860@@127.0.0.1@5432@create data base
create table tema (
   id          serial primary key,
   descricao   text not null check ( length(descricao) >= 3 ),
   postagem_id text not null
);

create table postagem (
   id         serial primary key,
   titulo     varchar(255) not null check ( length(titulo) >= 5 ),
   texto      text not null check ( length(texto) >= 10 ),
   data       timestamp default current_timestamp,
   usuario_id integer
      references usuario ( id )
         on delete cascade,
   tema_id    integer
      references tema ( id )
         on delete cascade
);

create table usuario (
   id          serial primary key,
   nome        text not null,
   email       text not null unique,
   foto        text,
   postagem_id text
);