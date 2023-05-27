const db = require('../../server/postgres');

/**
 * Todos os eventos retornam uma tabela com as seguintes colunas: 
 *  nome, código do evento, descrição, vaga, carga horária, link, data, 
 *  nome da modalidade, código da modalidade, local, código da categoria, 
 *  nome categoria, certificado, código de área de atuação, área de atuação 
 *  e número de interessados
 */

/**
 * Nome do Evento: 
 * exibe tabela com todos os eventos que possuem o nome requisitado 
 * e que estão acontecendo ou vão acontecer
 * @param {*} req nome do evento 
 */
const eventosPorNome = async (req, res) => {
    const nome = req.query.nome;

    try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
<<<<<<< HEAD
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
=======
                modali.cod_modalidade, modali.nome AS nome_modali,
>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
<<<<<<< HEAD
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
=======
>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE e.nome = '${nome}' AND e.data >= CURRENT_DATE
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
<<<<<<< HEAD
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
=======
                modali.cod_modalidade, modali.nome`;

        const resultado = await db.query(consulta);

        const codigoEvento = resultado.rows[0].cod_event;

        const consulta2 =
            `SELECT at.codigo AS cod_area, at.nome AS nome_area 
            FROM Evento_Area_Atuacao AS eaa
            INNER JOIN Area_Atuacao AS at
            ON eaa.cod_area = at.codigo
            WHERE eaa.cod_evento = ${codigoEvento}`;

        const resultado2 = await db.query(consulta2);

        if (resultado.rows == '' && resultado2.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            const resultadoFinal = {
                ...resultado.rows[0],
                area_de_atuacao: resultado2.rows
            };
            res.status(200).json({ status: 'success', result: resultadoFinal });
>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * Código Evento:
 * exibe tabela com todos os eventos que possuem o código requisitado 
 * @param {*} req código do evento 
 */
const eventosPorCodigo = async (req, res) => {
    const cod_evento = req.query.cod_evento;

    try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE e.codigo = ${cod_evento}
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * Categoria:
 * exibe tabela com todos os eventos que possuem a categoria requisitada
 * @param {*} req código da categoria 
*/
const eventosPorCategoria = async (req, res) => {
    const cod_categoria = req.query.cod_categoria;

    try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE cat.cod_categoria = ${cod_categoria} AND e.data >= CURRENT_DATE
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * Modalidade:
 * exibe todos os eventos que possuem a modalidade requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da modalidade 
 */
<<<<<<< HEAD
 const eventosPorModalidade = async (req, res) => {
=======
const eventosPorModalidade = async (req, res) => {
>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
    const cod_modalidade = req.query.cod_modalidade;

    try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE modali.cod_modalidade = ${cod_modalidade} AND e.data >= CURRENT_DATE
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * Área de atuação:
 * exibe tabela com todos os eventos que possuem a área de atuação requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da área de atuação
 */
const eventosPorAtuacao = async (req, res) => {
    const cod_area = req.query.cod_area;

    try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE atua.codigo = ${cod_area} AND e.data >= CURRENT_DATE
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;

        const resultado = await db.query(consulta);
<<<<<<< HEAD
        
=======

>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};


/**
 * 
 * exibe todos os eventos que possuem certificado ou não
 * e que estão acontecendo ou vão acontecer
 * @param {*} req valor booleano (false ou true) para certificado 
 */
<<<<<<< HEAD
 const eventosPorCertificado = async (req, res) => {
=======
const eventosPorCertificado = async (req, res) => {
>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
    const certificado = req.query.certificado;

    try {
        const consulta = `SELECT * FROM evento WHERE certificado = ${certificado} AND data >= CURRENT_DATE;`;

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
        }
        else {
            res.status(200).json({ status: 'success', result: resultado.rows });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};


module.exports = {
    eventosPorNome: eventosPorNome,
    eventosPorCodigo: eventosPorCodigo,
    eventosPorCategoria: eventosPorCategoria,
    eventosPorModalidade: eventosPorModalidade,
    eventosPorAtuacao: eventosPorAtuacao,
    eventosPorCertificado: eventosPorCertificado
};