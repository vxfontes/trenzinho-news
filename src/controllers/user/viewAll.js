const db = require('../../server/postgres');

const exibirTodosUsuarios = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM usuario';
        const resultado = await db.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    exibirTodosUsuarios: exibirTodosUsuarios
};