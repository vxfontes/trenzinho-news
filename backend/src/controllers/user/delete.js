const db = require('../../server/postgres');

const deleteUser = async (req, res) => {
    const id_user = req.query.id_user;

    try {
        const consulta = 
            `DELETE FROM Usuario WHERE id_user = ${id_user}`;

        const resultado = await db.query(consulta);

        if (resultado.rowCount === 1) { // Verifica se houve resultado na inserção de usuário
            res.status(200).json({ status: 'success', result: 'Usuário deletado com sucesso' });
        }
        else {
            res.status(400).json({ status: 'error', message: 'Ocorreu um erro ao deletar um usuário' });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    deleteUser: deleteUser
};