const db = require('../../server/postgres');

const addEvento = async (req, res) => {
    const nome = req.query.nome; // STRING => 
    const descricao = req.query.descricao;
    const vagas = req.query.vagas;
    const link = req.query.link;
    const carga_horaria = req.query.carga_horaria;
    const certificado = req.query.certificado;
    const data = req.query.data;
    const horario = req.query.horario;
    const cod_categoria = req.query.cod_categoria;
    const local = req.query.local;
    const modalidade = req.query.modalidade;
    const areas = req.query.areas; // lista com codigos das areas de atuação do evento

    const listaAreas = areas.split(',').map(Number)


    try {
        const consulta = 
            // Cláusula WITH nomeia a consulta para 'novo_evento' para que a consulta possa ser referenciada mais a frente
            // Cláusula RETURNING permite que você obtenha os valores de colunas específicas (Nesse caso, foi a coluna 'codigo' do tipo SERIAL, ou seja, autoincrementada pelo banco) das linhas afetadas por uma instrução INSERT, UPDATE ou DELETE.
            `WITH novo_evento AS (
                INSERT INTO Evento(nome, descricao, vagas, link, carga_horaria, certificado, data, horario, cod_categoria, local, modalidade)
                VALUES ('${nome}', '${descricao}', '${vagas}', '${link}', '${carga_horaria}', '${certificado}', '${data}', '${horario}', '${cod_categoria}', '${local}', '${modalidade}')
                RETURNING codigo
            )
            
            INSERT INTO Evento_Area_Atuacao(cod_evento, cod_area) 
            SELECT codigo, cod_area
            FROM novo_evento,
            (VALUES ${listaAreas.map( (area) => `(${area})`).join(', ')}) AS areas(cod_area);`;

        const resultado = await db.query(consulta);

        if (resultado.rowCount > 0) { // Verifica se houve resultado na inserção de usuário
            res.status(200).json({ status: 'success', result: 'Evento adicionado com sucesso' });
        }
        else {
            res.status(400).json({ status: 'error', message: 'Ocorreu um erro ao inserir um evento' });
        }
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao executar a consulta' });
    }
};

module.exports = {
    addEvento: addEvento
};