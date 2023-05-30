-- tools -> query tools

-- cria a database sozinha primeiramente

CREATE DATABASE TrenzinhoBD;

-- primeiro cria a database e depois cria todas as tabelas

CREATE TABLE Usuario (
        id_user SERIAL,
        is_admin BOOLEAN NOT NULL,
        nome VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        senha CHAR(16) NOT NULL,
        PRIMARY KEY (id_user),
        UNIQUE (email)
    );

CREATE TABLE Categoria (
        cod_categoria INTEGER,
        nome VARCHAR(30) NOT NULL,
        PRIMARY KEY (cod_categoria)
    );

CREATE TABLE Area_Atuacao (
        codigo INTEGER PRIMARY KEY, 
	nome VARCHAR(30) NOT NULL
    );

CREATE TABLE Modalidade (
        cod_modalidade INTEGER PRIMARY KEY,
        nome VARCHAR(30) NOT NULL
    );

CREATE TABLE Evento (
        codigo SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        descricao TEXT NOT NULL,
        vagas INTEGER NOT NULL,
        link_evento VARCHAR(100) NOT NULL,
        carga_horaria INTEGER NOT NULL,
        certificado BOOLEAN NOT NULL,
        data_evento DATE NOT NULL,
        horario TIME NOT NULL,
        cod_categoria INTEGER NOT NULL,
        local_evento TEXT NOT NULL,
        modalidade INTEGER NOT NULL,
	id_admin INTEGER NOT NULL,
        FOREIGN KEY (cod_categoria) 
			REFERENCES Categoria (cod_categoria) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (modalidade) 
			REFERENCES Modalidade (cod_modalidade) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_admin)
		REFERENCES Usuario (id_user) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE Evento_Area_Atuacao (
        cod_evento INTEGER,
        cod_area INTEGER,
        PRIMARY KEY (cod_evento, cod_area),
        FOREIGN KEY (cod_evento) 
			REFERENCES Evento (codigo) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (cod_area) 
			REFERENCES Area_atuacao (codigo) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE Interesse (
        id_user INTEGER,
        cod_evento INTEGER,
        PRIMARY KEY (id_user, cod_evento),
        FOREIGN KEY (id_user) 
			REFERENCES Usuario (id_user) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (cod_evento) 
			REFERENCES Evento (codigo) ON UPDATE CASCADE ON DELETE CASCADE
    );
