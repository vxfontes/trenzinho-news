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

-- cada evento individual, quantidade de pessoas interessadas nele, modalidade e categoria: 
SELECT e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, cat.nome AS categoria, e.local, m.nome AS modalidade, COUNT(*) AS quantidade_interessados 
INTO resultados_temp
FROM interesse AS i
INNER JOIN evento AS e ON i.cod_evento = e.codigo
INNER JOIN modalidade AS m ON e.modalidade = m.cod_modalidade
INNER JOIN categoria AS cat ON e.cod_categoria = cat.cod_categoria
GROUP BY e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, cat.nome, e.local, m.nome;
