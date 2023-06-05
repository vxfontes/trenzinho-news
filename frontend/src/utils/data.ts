export function formatarData(data: string): string {
    const dataObj = new Date(data);
    const dia = dataObj.getUTCDate().toString().padStart(2, '0');
    const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getUTCFullYear().toString();

    return `${dia}/${mes}/${ano}`;
}