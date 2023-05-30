const db = require('../../server/postgres');

const authUser = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const consulta = `SELECT id_user, admin, nome, email FROM usuario 
        WHERE email='${email}' and senha='${password}'`

    try {
        const resultado = await db.query(consulta);

        if (resultado.rows == '') {
            res.status(400).json({ status: 'error', message: 'Usuário não encontrado no banco de dados' });
        } else {

            res.status(200).json({ status: 'sucess', result: resultado.rows[0] })
        }
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
}

module.exports = {
    authUser: authUser
};