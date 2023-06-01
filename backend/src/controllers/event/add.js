const db = require('../../server/postgres');

/**
 * Add Evento:
 * Adiciona uma nova tupla na tabela Evento, com id autoincrementado pelo próprio banco.
 * Ao mesmo tempo, também é feita a inserção de N tuplas na tabela Evento_Area_Atuacao,
 *  contendo o código do novo evento inserido e o código da área de atuação desse evento
 * @param {*} req código do evento 
 */
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
    const modalidade = req.query.modalidade;
    const id_admin = req.query.id_admin;
    const areas = req.query.areas; // lista com codigos das areas de atuação do evento
    const rua = req.query.rua;
    const bairro = req.query.bairro;
    const cidade = req.query.cidade;
    const estado = req.query.estado;
    const CEP = req.query.CEP;
    const nome_universidade = req.query.nome_universidade;
    const nome_predio = req.query.nome_predio;
    const num_sala = req.query.num_sala;

    const listaAreas = areas.split(',').map(Number)


    try {
        const inserirEvento = 
            // Cláusula WITH nomeia a consulta para 'novo_evento' para que a consulta possa ser referenciada mais a frente
            // Cláusula RETURNING permite que você obtenha os valores de colunas específicas (Nesse caso, foi a coluna 'codigo' do tipo SERIAL, ou seja, autoincrementada pelo banco) das linhas afetadas por uma instrução INSERT, UPDATE ou DELETE.
            `INSERT INTO Evento(nome, descricao, vagas, link_evento, carga_horaria, certificado, data_evento, horario, cod_categoria, modalidade, id_admin)
            VALUES ('${nome}', '${descricao}', '${vagas}', '${link}', '${carga_horaria}', '${certificado}', '${data}', '${horario}', '${cod_categoria}', '${modalidade}', '${id_admin}')
            RETURNING codigo`

        const resultado1 = await db.query(inserirEvento);

        const codigoEvento = resultado1.rows[0].codigo;

        const inserirEventoAreaAtuacao = `
            INSERT INTO evento_area_atuacao (cod_evento, cod_area)
            VALUES ${listaAreas.map((area) => `(${codigoEvento}, ${area})`).join(', ')}`;

        const inserirEventoPresencial = `
            INSERT INTO evento_presencial(cod_evento, rua, bairro, cidade, estado, CEP)
            VALUES ('${codigoEvento}', '${rua}', '${bairro}', '${cidade}', '${estado}', '${CEP}')`;

        const inserirEventoDentroCampus = `
            INSERT INTO evento_dentro_campus(cod_evento, nome_universidade, cidade_campus, nome_predio)
            VALUES ('${codigoEvento}', '${nome_universidade}', '${cidade}', '${nome_predio}')`; 

        const inserirPredioComSala = `
            INSERT INTO predio_com_sala(cod_evento, num_sala)
            VALUES ('${codigoEvento}', '${num_sala}')`;

        const resultado2 = await db.query(inserirEventoAreaAtuacao);

        let resultado3 = '';        
        let resultado4 = '';
        let resultado5 = '';

        if (modalidade == 1) {

            resultado3 = await db.query(inserirEventoPresencial);

            if (nome_universidade != undefined) {

                resultado4 = await db.query(inserirEventoDentroCampus);

                if (num_sala != undefined) {

                    resultado5 = await db.query(inserirPredioComSala);
                }
            }
        
        }

        if (resultado1.rowCount > 0 && resultado2.rowCount > 0 && resultado3.rowCount > 0 && resultado4.rowCount > 0 && resultado5.rowCount > 0) { // Verifica se houve resultado na inserção de usuário
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