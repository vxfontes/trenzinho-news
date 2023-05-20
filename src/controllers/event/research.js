const db = require('../../server/postgres');

const eventosPorCategoria = async (req, res) => {
    const categoria = req.query.categoria;

    try {
        const consulta = `SELECT * FROM categoria CROSS JOIN evento WHERE categoria.nome = '${categoria}'`;
        const resultado = await db.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao executar a consulta', categoria: categoria });
    }
};

module.exports = {
    eventosPorCategoria: eventosPorCategoria
};