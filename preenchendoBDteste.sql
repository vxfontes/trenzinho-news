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
    'Evento ' || generate_series,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel hendrerit leo. In nisl ligula, finibus sed sapien vitae, blandit feugiat nunc. Quisque lobortis enim sem, id placerat urna euismod non. Proin blandit aliquam lorem, at molestie odio. Sed et ultrices libero. Suspendisse euismod egestas mauris, eu fermentum risus ultricies et. Cras tincidunt dui a libero dignissim, sit amet bibendum magna feugiat. Nullam volutpat est ante. Sed eu pharetra turpis. Aenean pellentesque lobortis tortor, ut maximus est consequat ac.Vestibulum vitae massa quis tortor dictum fringilla. Integer a orci in odio suscipit consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Donec hendrerit egestas augue, a consequat ante suscipit sed. Praesent sit amet velit sem. Suspendisse facilisis mauris eget facilisis tincidunt. Nullam vel ornare ante, semper lacinia dolor. Morbi quis neque vitae arcu posuere auctor eu sed sem. Maecenas in pharetra erat, at vehicula turpis. Sed condimentum nec felis id semper. Aenean consequat, arcu a fringilla fringilla, sapien magna vehicula nisl, ut fringilla est massa eget est Aliquam ex nibh, tristique vel ligula vitae, finibus tempor risus. Maecenas viverra est ac neque rhoncus volutpat a ut nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vitae luctus eros, vel eleifend nisl. Aliquam mollis facilisis commodo. Vestibulum lobortis iaculis turpis, malesuada pulvinar mauris porttitor a. Nulla quis volutpat quam, in cursus mi. Suspendisse pellentesque est ante, sit amet mattis odio rutrum porta.',
    floor(random() * 100) + 1,
    'http://exemplo.com/evento' || generate_series,
    floor(random() * 10) + 1,
    random() < 0.5,
    CURRENT_DATE + (floor(random() * 30) + 1) * INTERVAL '1 day',
    CURRENT_TIME + INTERVAL '1 hour' * floor(random() * 12) + INTERVAL '30 minute',
    floor(random() * 13) + 1,
    CASE WHEN random() < 0.5 THEN 1 ELSE 2 END,
    floor(random() * 4 + 1)
FROM generate_series(1, 20);