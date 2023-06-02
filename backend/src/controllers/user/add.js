const db = require('../../server/postgres');

/**
 * Add User: 
 * adiciona uma nova tupla na tabela Usuario, com id autoincrementado pelo próprio banco.
 * @param {*} req nome do evento 
 */
const addUser = async (req, res) => {
    const admin = req.query.admin;
    const nome = req.query.nome;
    const email = req.query.email;
    const senha = req.query.senha;


    try {
        const consulta = 
            `INSERT INTO Usuario(is_admin, nome, email, senha) VALUES (${admin}, '${nome}', '${email}', '${senha}')`;

        const resultado = await db.query(consulta);

        if (resultado.rowCount == 1) { // Verifica se houve resultado na inserção de usuário, retornando o número de tuplas afetadas pela consulta.
            res.status(200).json({ status: 'success', result: 'Usuário adicionado com sucesso' });
        }
        else {
            res.status(400).json({ status: 'error', message: 'Ocorreu um erro ao inserir um usuário' });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};


const addUserInteresse = async (req, res) => {
    const id_user = req.query.id_user;
    const cod_evento = req.query.cod_evento;

    try {
        const consulta = 
            `INSERT INTO Interesse(id_user, cod_evento) VALUES ('${id_user}', '${cod_evento}')`;

        const resultado = await db.query(consulta);

        if (resultado.rowCount == 1) { // Verifica se houve resultado na inserção de usuário, retornando o número de tuplas afetadas pela consulta.
            res.status(200).json({ status: 'success', result: 'Interesse adicionado com sucesso' });
        }
        else {
            res.status(400).json({ status: 'error', message: 'Ocorreu um erro ao inserir um usuário' });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};


module.exports = {
    addUser: addUser,
    addUserInteresse: addUserInteresse
};