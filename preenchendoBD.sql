-- você pode executar todos de uma vez ou um de cada, vendo o retorno de cada alteração

-- USUARIO

INSERT INTO Usuario (id_user, admin, nome, email, senha)
VALUES (1, FALSE, 'João Silva', 'joao.silva@example.com', '12345678'), (2, TRUE, 'Maria Souza', 'maria.souza@example.com', 'admin123'), (3, FALSE, 'Pedro Oliveira', 'pedro.oliveira@example.com', 'senha123'), (4, FALSE, 'Ana Santos', 'ana.santos@example.com', 'senha123'),
        (5, FALSE, 'Carlos Mendes', 'carlos.mendes@example.com', 'password'), (6, FALSE, 'Julia Costa', 'julia.costa@example.com', 'secure'), (7, TRUE, 'Lucas Ferreira', 'lucas.ferreira@example.com', 'admin123'), (8, FALSE, 'Camila Almeida', 'camila.almeida@example.com', 'qwert123'), (9, FALSE, 'Gustavo Lima', 'gustavo.lima@example.com', 'abc123');

SELECT * FROM Usuario;

-- CATEGORIAS	

INSERT INTO Categoria (cod_categoria, nome)
VALUES (1, 'Palestra'), (2, 'Workshop'), (3, 'Curso'), (4, 'Congresso'), (5, 'Encontro'), (6, 'Seminário'), (7, 'Mesa-redonda'), (8, 'Simpósio'), (9, 'Painel'), (10, 'Fórum'), (11, 'Conferência'), (12, 'Jornada'), (13, 'Colóquio'), (14, 'Atleticano');

SELECT * from Categoria;

-- AREA DE ATUAÇÃO

INSERT INTO Area_atuacao (codigo, nome)
VALUES (1, 'Robótica'), (2, 'Inteligência Artificial'), (3, 'Astronomia'), (4, 'Desenvolvimento Web'), (5, 'Empreendedorismo'), (6, 'Energias Renováveis'), (7, 'Construção Civil'), (8, 'Drones'), (9, 'Vibrações Mecânicas'), (10, 'Arduino');

SELECT * FROM Area_atuacao;


-- MODALIDADE

INSERT INTO Modalidade (cod_modalidade, nome)
VALUES (1, 'Presencial'), (2, 'Online');

SELECT * FROM Modalidade;


-- EVENTOS

INSERT INTO Evento (codigo, nome, descricao, vagas, link, carga_horaria, certificado, data, horario, cod_categoria, local, modalidade)
VALUES (1, 'Universitário', 'Evento universitário', 100, 'https://exemplo.com/evento', 4, true, '2023-05-20', '07:00:00', 2, 'Local do evento', 1),
(2, 'Evento Especial', 'Descrição do evento especial', 50, 'https://exemplo.com/evento-especial', 6, true, '2023-06-10', '19:00:00', 3, 'Local do evento especial', 2),
(3, 'Evento Aleatório', 'Descrição do Evento Aleatório', 50, 'http://exemplo.com', 4, true, '2023-05-20', '14:00:00', 1, 'Local do Evento', 1),
(4, 'Palestra de Marketing', 'Descubra as estratégias de marketing mais eficazes', 30, 'https://exemplo.com/palestra-marketing', 2, true, '2023-07-05', '15:30:00', 1, 'Local da palestra', 1),
(5, 'Workshop de Fotografia', 'Aprenda técnicas avançadas de fotografia', 20, 'https://exemplo.com/workshop-fotografia', 4, true, '2023-07-15', '18:00:00', 2, 'Local do workshop', 2),
(6, 'Curso de Programação', 'Aprenda a programar em linguagens populares', 40, 'https://exemplo.com/curso-programacao', 8, true, '2023-08-02', '09:00:00', 3, 'Local do curso', 1),
(7, 'Congresso de Saúde', 'Discutindo avanços e desafios na área da saúde', 100, 'https://exemplo.com/congresso-saude', 12, true, '2023-08-20', '14:30:00', 4, 'Local do congresso', 2),
(8, 'Encontro de Arte e Cultura', 'Explorando expressões artísticas e culturais', 80, 'https://exemplo.com/encontro-arte-cultura', 5, true, '2023-09-10', '10:00:00', 5, 'Local do encontro', 1),
(9, 'Seminário de Tecnologia', 'Discussões sobre as últimas tendências tecnológicas', 60, 'https://exemplo.com/seminario-tecnologia', 7, true, '2023-09-25', '16:00:00', 6, 'Local do seminário', 2),
(10, 'Mesa-redonda de Negócios', 'Debates entre especialistas sobre o mundo dos negócios', 40, 'https://exemplo.com/mesa-redonda-negocios', 4, true, '2023-10-05', '19:30:00', 7, 'Local da mesa-redonda', 1),
(11, 'Simpósio de Educação', 'Reflexões sobre os desafios da educação contemporânea', 50, 'https://exemplo.com/simposio-educacao', 6, true, '2023-10-20', '13:00:00', 8, 'Local do simpósio', 2),
(12, 'Painel de Sustentabilidade', 'Abordando práticas sustentáveis e responsabilidade ambiental', 30, 'https://exemplo.com/painel-sustentabilidade', 3, true, '2023-11-10', '16:30:00', 9, 'Local do painel', 1),
(13, 'Fórum de Inovação', 'Explorando ideias inovadoras e empreendedorismo', 50, 'https://exemplo.com/forum-inovacao', 8, true, '2023-11-25', '10:30:00', 10, 'Local do fórum', 2),
(14, 'Conferência de Ciência', 'Apresentação de pesquisas científicas e avanços tecnológicos', 70, 'https://exemplo.com/conferencia-ciencia', 10, true, '2023-12-05', '17:00:00', 11, 'Local da conferência', 1),
(15, 'Jornada de Arquitetura', 'Explorando a arquitetura e seus aspectos estéticos', 25, 'https://exemplo.com/jornada-arquitetura', 5, true, '2023-12-15', '09:00:00', 12, 'Local da jornada', 2),
(16, 'Colóquio de Filosofia', 'Debates filosóficos com renomados especialistas', 20, 'https://exemplo.com/coloquio-filosofia', 4, false, '2023-12-25', '14:00:00', 13, 'Local do colóquio', 1),
(17, 'Liga leão do recôncavo', 'Encontro para atleticanos apaixonados pelo esporte', 30, 'https://exemplo.com/atleticano', 3, true, '2024-01-10', '20:00:00', 14, 'Ginásio', 1);

SELECT * FROM Evento;

-- EVENTOS E AREA DE ATUACAO

INSERT INTO Evento_Area_Atuacao (cod_evento, cod_area)
VALUES (1, 2), (1, 3), (1, 10), (2, 1), (2, 3), (2, 4), (3, 2), (3, 4), (3, 6), (4, 1), (4, 2), (4, 5), (5, 1), (5, 4), (5, 6), (6, 2), 
    (6, 7), (6, 9), (7, 1), (7, 3), (7, 5), (8, 3), (8, 4), (8, 8), (9, 1), (9, 6), (9, 7), (10, 1), (10, 2), (10, 10), (11, 3), (11, 5), 
    (11, 8), (12, 1), (12, 4), (12, 6), (13, 2), (13, 3), (13, 9), (14, 2), (14, 5), (14, 7), (15, 4), (15, 6), (15, 10), (16, 1), (16, 4), 
    (16, 5), (17, 2), (17, 3), (17, 8);

SELECT * FROM Evento_Area_atuacao;


-- CADASTRO

INSERT INTO Cadastro (id_user, cod_evento)
VALUES (2, 2), (2, 1), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), 
    (2, 16), (2, 17), (7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7), (7, 8), (7, 9), (7, 10), (7, 11), (7, 12), (7, 13), 
    (7, 14), (7, 15), (7, 16), (7, 17);

SELECT * FROM Cadastro;


-- INTERESSE

INSERT INTO Interesse (id_user, cod_evento)
VALUES (1, 1), (1, 2), (3, 3), (3, 4), (3, 5), (3, 6), (5, 6), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), 
    (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7), (7, 8), (7, 9), (7, 10), 
    (7, 11), (7, 12), (7, 13), (7, 14), (7, 15), (7, 16), (7, 17), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12), (3, 13), (3, 14), 
    (3, 15), (3, 16), (3, 17), (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11), (4, 12), (4, 13), 
    (4, 14), (4, 15), (4, 16), (4, 17), (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11), (6, 12);

SELECT * FROM Interesse;
