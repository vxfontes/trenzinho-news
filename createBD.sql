-- tools -> query tools

-- cria a database sozinha primeiramente

CREATE DATABASE TrenzinhoBD;

-- primeiro cria a database e depois cria todas as tabelas

CREATE TABLE Usuario (
        id_user INTEGER,
        admin BOOLEAN,
        nome VARCHAR(30),
        email VARCHAR(30),
        senha CHAR(16),
        PRIMARY KEY (id_user),
        UNIQUE (email)
    );

CREATE TABLE Categoria (
        cod_categoria INTEGER,
        nome VARCHAR(30) NOT NULL,
        PRIMARY KEY (cod_categoria)
    );

CREATE TABLE Area_atuacao (
        codigo INTEGER PRIMARY KEY, nome VARCHAR(30)
    );

CREATE TABLE Modalidade (
        cod_modalidade INTEGER PRIMARY KEY,
        nome VARCHAR(30)
    );

CREATE TABLE Evento (
        codigo INTEGER PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        descricao TEXT,
        vagas INTEGER NOT NULL,
        link VARCHAR(100) NOT NULL,
        carga_horaria INTEGER NOT NULL,
        certificado BOOLEAN NOT NULL,
        data DATE NOT NULL,
        horario TIME NOT NULL,
        cod_categoria INTEGER NOT NULL,
        local TEXT NOT NULL,
        modalidade INTEGER,
        FOREIGN KEY (cod_categoria) REFERENCES Categoria (cod_categoria),
        FOREIGN KEY (modalidade) REFERENCES Modalidade (cod_modalidade)
    );

CREATE TABLE Evento_Area_Atuacao (
        cod_evento INTEGER,
        cod_area INTEGER,
        PRIMARY KEY (cod_evento, cod_area),
        FOREIGN KEY (cod_evento) REFERENCES Evento (codigo),
        FOREIGN KEY (cod_area) REFERENCES Area_atuacao (codigo)
    );

CREATE TABLE Cadastro (
        id_user INTEGER,
        cod_evento INTEGER,
        PRIMARY KEY (id_user, cod_evento),
        FOREIGN KEY (id_user) REFERENCES Usuario (id_user),
        FOREIGN KEY (cod_evento) REFERENCES Evento (codigo)
    );

CREATE TABLE Interesse (
        id_user INTEGER,
        cod_evento INTEGER,
        PRIMARY KEY (id_user, cod_evento),
        FOREIGN KEY (id_user) REFERENCES Usuario (id_user),
        FOREIGN KEY (cod_evento) REFERENCES Evento (codigo)
    );