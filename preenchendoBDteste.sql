-- Inserir 5 usuários administradores
INSERT INTO Usuario (is_admin, nome, email, senha)
SELECT true, 'Administrador ' || generate_series, 'admin' || generate_series || '@exemplo.com', 'senha' || generate_series
FROM generate_series(1, 5);

-- Inserir 11 usuários não administradores
INSERT INTO Usuario (is_admin, nome, email, senha)
SELECT false, 'Usuário ' || generate_series, 'usuario' || generate_series || '@exemplo.com', 'senha' || generate_series
FROM generate_series(1, 11);

-- CATEGORIAS	

INSERT INTO Categoria (cod_categoria, nome)
VALUES (1, 'Palestra'), (2, 'Workshop'), (3, 'Curso'), (4, 'Congresso'), (5, 'Encontro'), (6, 'Seminário'), (7, 'Mesa-redonda'), (8, 'Simpósio'), (9, 'Painel'), (10, 'Fórum'), (11, 'Conferência'), (12, 'Jornada'), (13, 'Colóquio'), (14, 'Atleticano');

-- AREA DE ATUAÇÃO

INSERT INTO Area_atuacao (codigo, nome)
VALUES (1, 'Robótica'), (2, 'Inteligência Artificial'), (3, 'Astronomia'), (4, 'Desenvolvimento Web'), (5, 'Empreendedorismo'), (6, 'Energias Renováveis'), (7, 'Construção Civil'), (8, 'Drones'), (9, 'Vibrações Mecânicas'), (10, 'Arduino');


-- MODALIDADE

INSERT INTO Modalidade (cod_modalidade, nome)
VALUES (1, 'Presencial'), (2, 'Online');


-- EVENTOS

INSERT INTO Evento (nome, descricao, vagas, link_evento, carga_horaria, certificado, data_evento, horario, cod_categoria, modalidade, id_admin)
SELECT
    'Evento ' || e.num_evento,
    'Descrição do evento ' || e.num_evento,
    floor(random() * 100) + 1,
    'http://exemplo.com/evento' || e.num_evento,
    floor(random() * 10) + 1,
    random() < 0.5,
    CURRENT_DATE + (floor(random() * 30) + 1) * INTERVAL '1 day',
    CURRENT_TIME + INTERVAL '1 hour' * floor(random() * 12) + INTERVAL '30 minute',
    c.cod_categoria,
    m.cod_modalidade,
    floor(random() * 16) + 33
FROM generate_series(1, 20) AS e(num_evento)
CROSS JOIN Categoria AS c
CROSS JOIN Modalidade AS m;
