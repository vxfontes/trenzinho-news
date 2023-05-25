const db = require('../../server/postgres');


/**
 * 
 * exibe todos os usuários comuns (APENAS para admin)
 * @param {*} req id, nome e email dos usuários comuns 
 */
const exibirTodosUsuarios = async (req, res) => {
    try {
        const consulta = `SELECT id_user, nome, email FROM usuario;`;
        
        const resultado = await db.query(consulta);
        
        if (resultado.rows == '') {
            res.status(400).json({ status: 'error', message: 'Usuário não cadastrado' })
        }
        else {
            res.status(200).json({ status: 'sucess', result: resultado.rows })
        }        
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};


/**
 * Exibe todos os eventos selecionados por um usuário
 * @param {*} req Colunas de Eventos: nome, código do evento, descrição, vaga, carga horária, link, data, 
 * nome da modalidade, código da modalidade, local, código da categoria, nome categoria, certificado, 
 * código de área de atuação, área de atuação e número de interessados
 */
const userEvents = async (req, res) => {
    const id_user = req.query.id_user;

    try {
        const consulta = ` 
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali, 
                atua.codigo AS cod_area_atuacao, atua.nome AS nome_area_ataucao,
                COUNT(*) AS total_interessados
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN evento_area_atuacao AS eaa
            ON eaa.cod_evento = e.codigo
            INNER JOIN area_atuacao AS atua
            ON eaa.cod_area = atua.codigo
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE interesse.id_user = '${id_user}'
            GROUP BY e.codigo, e.nome, e.descricao, e.vagas, 
                e.link, e.carga_horaria, e.certificado, e.data, e.horario, e.local,
                cat.cod_categoria, cat.nome,
                modali.cod_modalidade, modali.nome, 
                atua.codigo, atua.nome `;
        
        const resultado = await db.query(consulta);
        
        res.json(resultado.rows);

        if (resultado.rows == '') {
            res.status(400).json({ status: 'error', message: 'Usuário não encontrado' })
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
    userEvents: userEvents
};