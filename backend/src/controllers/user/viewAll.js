const db = require('../../server/postgres');

/**
 * Todos os eventos retornam uma tabela com as seguintes colunas: 
 *  código e nome git add do evento, descrição, vaga, carga horária, link, data,
 *  código e nome da modalidade, local, código e nome da categoria, certificado, 
 *  código e nome das áreas de atuação, 
 *  id e nome do usuario admin que o cadastrou, e número de interessados
 */

/**
 * 
 * exibe todos os usuários comuns (APENAS para admin)
 * @param {*} res exibir id, nome e email dos usuários comuns 
 */
const exibirTodosUsuarios = async (req, res) => {
    try {
        const consulta = `SELECT id_user, nome, email FROM usuario WHERE is_admin = false`;
        
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
 * @param {*} req id do usuario comum
 */
const userEvents = async (req, res) => {
    const id_user = req.query.id_user;

    try {
        const consultaEvento = `
            SELECT e.codigo AS cod_event, e.nome AS nome_evento, e.descricao, e.vagas, 
                e.link_evento, e.carga_horaria, e.certificado, e.data_evento, e.horario, e.local_evento,
                cat.cod_categoria, cat.nome AS nome_categ,
                modali.cod_modalidade, modali.nome AS nome_modali,
                admin.id_user AS id_admin, admin.nome AS nome_admin
            FROM evento AS e
            INNER JOIN categoria AS cat
            ON cat.cod_categoria = e.cod_categoria
            INNER JOIN modalidade AS modali
            ON modali.cod_modalidade = e.modalidade
            INNER JOIN Usuario AS admin
            ON admin.id_user = e.id_admin
            INNER JOIN interesse
            ON interesse.cod_evento = e.codigo
            WHERE interesse.id_user = '${id_user}'`;

        const consultaArea = `
            SELECT ae.cod_evento, eve.nome, ae.cod_area, area.nome FROM evento_area_atuacao AS ae
            INNER JOIN evento AS eve
            ON eve.codigo = ae.cod_evento
            INNER JOIN area_atuacao AS area
            ON area.codigo = ae.cod_area
            GROUP BY eve.nome, area.nome, ae.cod_evento, ae.cod_area`;

        const consultaInteresse = `
            SELECT e.codigo AS cod_evento, 
            COUNT (i.cod_evento) AS total_interessados
            FROM Evento AS e
            LEFT JOIN Interesse AS i
            ON i.cod_evento = e.codigo
            GROUP BY e.codigo`;

        const resultadoEvento = await db.query(consultaEvento);
        const resultadoArea = await db.query(consultaArea);
        const resultadoInteresse = await db.query(consultaInteresse);

        if (resultadoEvento.rows == '' || resultadoArea.rows == '' || resultadoInteresse.rows == '') { // Verifica se houve resultado na pesquisa
            res.status(400).json({ status: 'error', message: 'Usuário não encontrado ou não possui evento selecionado' });
        }
        else {
            const resultadoFinal = resultadoEvento.rows.map(res => {
                const codigoEvento = res.cod_event;
                const areaDeAtuacao = resultadoArea.rows.filter(row => row.cod_evento === codigoEvento);
                const interesse = resultadoInteresse.rows.filter(row => row.cod_evento === codigoEvento)[0].total_interessados;
                res.area_de_atuacao = areaDeAtuacao;
                res.total_interessados = interesse;
                return res;
            });
            res.status(200).json({ status: 'success', result: resultadoFinal });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }

    /*try {
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
        
        //res.json(resultado.rows);

        if (resultado.rows == '') {
            res.status(400).json({ status: 'error', message: 'Usuário não encontrado' })
        }
        else {
            res.status(200).json({ status: 'sucess', result: resultado.rows })
        }

    } catch (error) {
        console.log('Erro ao executar a consulta', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }*/
}

module.exports = {
    exibirTodosUsuarios: exibirTodosUsuarios,
    userEvents: userEvents
};