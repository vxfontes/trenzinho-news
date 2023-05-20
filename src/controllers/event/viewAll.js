const db = require('../../server/postgres');

/**
 * exibE os eventos e a quantidade de interessados
 * @param {*} res retorno das tabelas
 */
const eventosEInteresses = async (req, res) => {
    try {
        const consulta = `SELECT e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.cod_categoria, e.local, e.modalidade, 
            COUNT(*) AS quantidade_interessados  
            FROM interesse AS i 
            CROSS JOIN evento AS e  
            WHERE i.cod_evento = e.codigo GROUP BY e.codigo, e.nome, e.descricao, e.vagas, e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.cod_categoria, e.local, e.modalidade`;
        
            const resultado = await db.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    eventosEInteresses: eventosEInteresses
};