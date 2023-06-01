import { Box } from '@mui/material'
import LoginServices from "../../logic/LoginServices";
import { TypoNunito } from "../../components/materialUiComponents/typography";
import scene from '../../assets/scenes/7.png'

const WelcomeMessage = () => {
    const user = LoginServices.gotLogin
    const login = LoginServices.logged

    const texto = !login ? (" venha fazer login na nossa plataforma") : (` ${user.nome}! Aqui estão os próximos eventos.`)

    return (
        <Box display='flex' sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Box display='flex' sx={{
                width: '60%',
                alignItems: 'center',
            }}>
                <TypoNunito variant="h4" color="initial" fontWeight={'bold'} align='right'>
                    Olá, {texto}
                </TypoNunito>
                <img src={scene} alt="Estudantes" width={400} />
            </Box>
        </Box>
    );
}

export default WelcomeMessage;