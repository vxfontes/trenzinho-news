import { getLogin, isLogged } from "./getLogin"

class Services {

    get gotLogin() { return getLogin() }
    get logged() { return isLogged() }
}

const LoginServices = new Services();
export default LoginServices;