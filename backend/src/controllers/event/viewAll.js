const db = require('../../server/postgres');

/**
 * 
 * exibe tabela com todos os eventos, independente da data em que foram publicados (APENAS para admin)
 * @param {*} res todos os eventos
 */
const exibirEventosAdmin = async (req, res) => {
    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }

        /**
         * const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento, e.id_admin,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                admin.nome AS nome_admin,
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
            INNER JOIN usuario AS admin
            ON admin.id_user = e.id_admin
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome,
                admin.nome `;
         */
};

/**
 * 
 * exibe tabela com todos os eventos que estão acontecendo ou vão acontecer
 * @param {*} res todos os eventos
 */
const exibirEventos = async (req, res) => {
    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin
            AND e.data_evento >= CURRENT_DATE`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }

    /*try {
        const consulta = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            AND e.data >= CURRENT_DATE
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome`;
        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const resultado = await db.query(consulta);
        const resultadoArea = await db.query(consultaArea);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto' });
        }
        else {
            const resultadoFinal = resultado.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                res.area_de_atuacao = areaDeAtuacao;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }*/
};


/**
 * 
 * exibe tabela com todas as categorias
 * @param {*} res todas as categorias
*/
const exibirTodasCategorias = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM categoria';

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há categoria cadastrada' });
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
 * exibe tabela com todas as áreas de atuação
 * @param {*} res todas as áreas de atuação
*/
const exibirTodasAreas = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM area_atuacao';

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há área de atuação cadastrada' });
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
 * exibe tabela com todas as modalidades cadastradas
 * @param {*} res todas as modalidades
*/
const exibirModalidades = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM modalidade';

        const resultado = await db.query(consulta);

        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há modalidade cadastrada' });
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
 * exibe tabela com todos os eventos que estão acontecendo ou vão acontecer e que serão realizados pela manhã, a partir de 06h até antes das 12h
 * @param {*} res todas os eventos pela manhã
*/
const exibirEventosManha = async (req, res) => {
    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin
            AND e.data_evento >= CURRENT_DATE
            WHERE e.horario >= '06:00' AND e.horario < '12:00'`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto no turno da manhã' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * 
 * exibe tabela com todos os eventos que estão acontecendo ou vão acontecer e que serão realizados pela tarde, a partir de 12h até antes das 18h
 * @param {*} res todas os eventos pela tarde
*/
const exibirEventosTarde = async (req, res) => {
    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin
            AND e.data_evento >= CURRENT_DATE
            WHERE e.horario >= '12:00' AND e.horario < '18:00'`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto no turno da tarde' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/**
 * 
 * exibe tabela com todos os eventos que estão acontecendo ou vão acontecer e que serão realizados pela noite, a partir de 18h até antes das 24h
 * @param {*} res todas os eventos pela noite
*/
const exibirEventosNoite = async (req, res) => {
    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin
            AND e.data_evento >= CURRENT_DATE
            WHERE e.horario >= '18:00' AND e.horario < '24:00'`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto no turno da noite' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    exibirEventosAdmin: exibirEventosAdmin,
    exibirEventos: exibirEventos,
    exibirTodasCategorias: exibirTodasCategorias,
    exibirTodasAreas: exibirTodasAreas,
    exibirModalidades: exibirModalidades,
    exibirEventosManha: exibirEventosManha,
    exibirEventosTarde: exibirEventosTarde,
    exibirEventosNoite: exibirEventosNoite
};