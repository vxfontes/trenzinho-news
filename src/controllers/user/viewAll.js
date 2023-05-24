const db = require('../../server/postgres');

const exibirTodosUsuarios = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM usuario';
        const resultado = await db.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

/* Exibe todos os eventos selecionados por um usuário*/

const myEvents = async (req, res) => {
    const id_user = req.query.id_user;

    try {
        const consulta = `SELECT * FROM evento INNER JOIN interesse ON evento.codigo = interesse.cod_evento WHERE interesse.id_user = '${id_user}'`;
        const resultado = await db.query(consulta);
        res.json(resultado.rows);

        if (resultado.rows == '') {
            res.status(400).json({ status: 'error', message: 'Evento não encontrado' })
        }
        else {
            res.status(200).json({ status: 'sucess', result: resultado.rows })
        }

    } catch (error) {
        console.log('Erro ao executar a consulta', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
}

module.exports = {
    exibirTodosUsuarios: exibirTodosUsuarios,
    myEvents: myEvents
};