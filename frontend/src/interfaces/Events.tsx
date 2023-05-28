export interface EventData {
    cod_event: number;
    nome_evento: string;
    descricao: string;
    vagas: number;
    link: string;
    carga_horaria: number;
    certificado: boolean;
    data: string;
    horario: string;
    local: string;
    cod_categoria: number;
    nome_categ: string;
    cod_modalidade: number;
    nome_modali: string;
    total_interessados: string;
    area_de_atuacao: AreaDeAtuacao[];
}

export interface AreaDeAtuacao {
    cod_evento: number;
    nome: string;
    cod_area: number;
}
