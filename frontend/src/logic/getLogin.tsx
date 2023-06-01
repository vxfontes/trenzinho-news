import { Usuario } from "../interfaces/Events"

export const isLogged = () => {
    if (localStorage.getItem('usuarioLogado') === undefined || localStorage.getItem('usuarioLogado') === null) return false
    else return true
}

export const getLogin: () => Usuario = () => {
    if (localStorage.getItem('usuarioLogado') === undefined || localStorage.getItem('usuarioLogado') === null) {
        return { id_user: 0, is_admin: false, nome: "", email: "" };
    }
    else return JSON.parse(localStorage.getItem('usuarioLogado')!) as Usuario;
}