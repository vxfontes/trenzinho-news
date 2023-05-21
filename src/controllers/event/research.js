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
 * exibe tabela com todos os eventos que possuem o nome requisitado 
 * e que estão acontecendo ou vão acontecer
 * @param {*} req código do evento 
 */
const eventosPorCodigo = async (req, res) => {
    const codigo = req.query.codigo;

    try {
        const consulta = `SELECT * FROM evento WHERE codigo = ${codigo} AND data >= CURRENT_DATE`;

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

module.exports = {
    eventosPorNome: eventosPorNome,
    eventosPorCodigo: eventosPorCodigo,
    eventosPorCategoria: eventosPorCategoria
};