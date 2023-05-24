const db = require('../../server/postgres');

/**
 * 
 * exibe tabela com todos os eventos que possuem o nome requisitado 
 * e que estão acontecendo ou vão acontecer
 * @param {*} req nome do evento 
 */
const eventosPorNome = async (req, res) => {
    const nome = req.query.nome;

    try {
        const consulta = `SELECT * FROM evento WHERE nome = '${nome}' AND data >= CURRENT_DATE`;

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
 * 
 * exibe tabela com todos os eventos que possuem o código requisitado 
 * @param {*} req código do evento 
 */
const eventosPorCodigo = async (req, res) => {
    const codigo = req.query.codigo;

    try {
        const consulta = `SELECT * FROM evento WHERE codigo = ${codigo}`;

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
 * 
 * exibe tabela com todos os eventos que possuem a categoria requisitada
 * @param {*} req nome da categoria 
*/
const eventosPorCategoria = async (req, res) => {
    const categoria = req.query.categoria;

    try {
        const consulta = `SELECT * FROM categoria CROSS JOIN evento WHERE categoria.nome = '${categoria}'`;

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
 * 
 * exibe tabela com todos os eventos que possuem a área de atuação requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da área de atuação
 */
const eventosPorAtuacao = async (req, res) => {
    const area = req.query.area;

    try {
        const consulta = `
            SELECT e.codigo AS cod_evento, e.nome AS nome_evento, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.cod_categoria, e.local, e.modalidade, a.codigo AS cod_area, a.nome AS nome_area
            FROM Evento_Area_Atuacao
            INNER JOIN evento AS e
            ON Evento_Area_Atuacao.cod_evento = e.codigo
            INNER JOIN area_atuacao AS a
            ON Evento_Area_Atuacao.cod_area = a.codigo
            WHERE Evento_Area_Atuacao.cod_area = ${area} AND e.data >= CURRENT_DATE`;

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
 * 
 * exibe todos os eventos que possuem a modalidade requisitada
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código da modalidade 
 */
 const eventosPorModalidade = async (req, res) => {
    const modalidade = req.query.modalidade;

    try {
        const consulta = `SELECT * FROM evento WHERE modalidade = ${modalidade} AND data >= CURRENT_DATE;`;

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
 * 
 * exibe todos os eventos que possuem certificado ou não
 * e que estão acontecendo ou vão acontecer
 * @param {*} req valor booleano (false ou true) para certificado 
 */
 const eventosPorCertificado = async (req, res) => {
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
    eventosPorAtuacao: eventosPorAtuacao,
    eventosPorModalidade: eventosPorModalidade,
    eventosPorCertificado: eventosPorCertificado
};