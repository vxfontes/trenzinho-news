const db = require('../../server/postgres');

/**
 * Todos os eventos retornam uma tabela com as seguintes colunas: 
 *  nome, código do evento, descrição, vaga, carga horária, link, data, 
 *  nome da modalidade, código da modalidade, local, código da categoria, 
 *  nome categoria, certificado, código de área de atuação, área de atuação, 
 *  id e nome do usuario admin que o cadastrou, e número de interessados
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
            WHERE e.nome = '${nome}' AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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

/** ******************* ******************* ******************* ******************* ******************* ******************* */
/** ******************* ******************* ******************* ******************* ******************* ******************* */

/**
 * Código Evento:
 * exibe tabela com todos os eventos que possuem o código requisitado 
 * @param {*} req código do evento 
 */
const eventosPorCodigo = async (req, res) => {
    const cod_evento = req.query.cod_evento;

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
            WHERE e.codigo = ${cod_evento} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado' });
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


/** ******************* ******************* ******************* ******************* ******************* ******************* */
/** ******************* ******************* ******************* ******************* ******************* ******************* */


/**
 * Categoria:
 * exibe tabela com todos os eventos que possuem a categoria requisitada
 * @param {*} req código da categoria 
*/
const eventosPorCategoria = async (req, res) => {
    const cod_categoria = req.query.cod_categoria;

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
            WHERE cat.cod_categoria = ${cod_categoria} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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

/** ******************* ******************* ******************* ******************* ******************* ******************* */
/** ******************* ******************* ******************* ******************* ******************* ******************* */

/**
 * Modalidade:
 * exibe todos os eventos que possuem a modalidade requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da modalidade 
 */
const eventosPorModalidade = async (req, res) => {
    const cod_modalidade = req.query.cod_modalidade;

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
            WHERE modali.cod_modalidade = ${cod_modalidade} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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

/** ******************* ******************* ******************* ******************* ******************* ******************* */
/** ******************* ******************* ******************* ******************* ******************* ******************* */

/**
 * Área de atuação:
 * exibe tabela com todos os eventos que possuem a área de atuação requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da área de atuação
 */
const eventosPorAtuacao = async (req, res) => {
    const cod_area = req.query.cod_area;

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
            INNER JOIN evento_area_atuacao AS ae
            ON ae.cod_evento = e.codigo
            WHERE ae.cod_area = ${cod_area} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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


/** ******************* ******************* ******************* ******************* ******************* ******************* */
/** ******************* ******************* ******************* ******************* ******************* ******************* */

/**
 * 
 * exibe todos os eventos que possuem certificado ou não
 * e que estão acontecendo ou vão acontecer
 * @param {*} req valor booleano (false ou true) para certificado 
 */
const eventosPorCertificado = async (req, res) => {
    const certificado = req.query.certificado;

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
            WHERE certificado = ${certificado} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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
 * exibe todos os eventos que possuem certificado ou não
 * e que estão acontecendo ou vão acontecer
 */
const eventosPorCertificadoGet = async (req, res) => {
    const certificado = true;

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
            WHERE certificado = ${certificado} AND e.data_evento >= CURRENT_DATE`;

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
            res.status(400).json({ status: 'error', message: 'Evento não encontrado ou expirado' });
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
    eventosPorNome: eventosPorNome,
    eventosPorCodigo: eventosPorCodigo,
    eventosPorCategoria: eventosPorCategoria,
    eventosPorModalidade: eventosPorModalidade,
    eventosPorAtuacao: eventosPorAtuacao,
    eventosPorCertificado: eventosPorCertificado,
    eventosPorCertificadoGet: eventosPorCertificadoGet
};