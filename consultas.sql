-- buscar por categoria: 
SELECT * FROM categoria 
CROSS JOIN evento 
WHERE categoria.nome = 'nome categoria';

-- quantidade de interessados em cada evento: 
SELECT interesse.cod_evento, evento.nome, COUNT(*) AS total 
FROM interesse 
CROSS JOIN evento 
WHERE interesse.cod_evento = evento.codigo 
GROUP BY interesse.cod_evento, evento.nome;

-- cada evento individual e a quantidade de pessoas interessadas nele: 
SELECT e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.cod_categoria, e.local, e.modalidade, COUNT(*) AS quantidade_interessados 
FROM interesse AS i
CROSS JOIN evento AS e 
WHERE i.cod_evento = e.codigo
GROUP BY e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.cod_categoria, e.local, e.modalidade;
