const db = require('../../server/postgres');

/**
 * 
 * exibe tabela com todos os eventos que estão acontecendo ou vão acontecer
 * @param {*} res todas os eventos
 */
const exibirEventos = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM evento WHERE data >= CURRENT_DATE';
        
        const resultado = await db.query(consulta);
        
        if (resultado.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Não há evento cadastrado ou aberto' });
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
 * exibE os eventos, quantidade de interessados, modalidade e categoria
 * @param {*} res retorno das tabelas
 */
const eventosEInteresses = async (req, res) => {
    try {
        const consulta = `
            SELECT e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, cat.nome AS categoria, e.local, m.nome AS modalidade, COUNT(*) AS quantidade_interessados 
            FROM interesse AS i
            INNER JOIN evento AS e ON i.cod_evento = e.codigo
            INNER JOIN modalidade AS m ON e.modalidade = m.cod_modalidade
            INNER JOIN categoria AS cat ON e.cod_categoria = cat.cod_categoria
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, cat.nome, e.local, m.nome;
        `
        const resultado = await db.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
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
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    exibirEventos: exibirEventos,
    eventosEInteresses: eventosEInteresses,
    exibirTodasCategorias: exibirTodasCategorias
};