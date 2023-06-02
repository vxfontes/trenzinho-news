import * as React from 'react';
import Api from '../../api/Api';
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { CircularProgress, Box, IconButton, Snackbar, Alert, Grid } from '@mui/material'
import { GridStyled } from '../../components/materialUiComponents/Grids';
import { UsuarioProps } from '../../interfaces/Events';
import { TypoNunito } from '../../components/materialUiComponents/typography';
import DeleteIcon from '@mui/icons-material/Delete';
import scene from '../../assets/scenes/10.png'
import LoginServices from '../../logic/LoginServices';

const Listar = () => {
    const [usuarios, setusuarios] = React.useState<UsuarioProps[]>([]);
    const [loading, setloading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        Api.get('/users').then((res) => {
            const data = res.data.result
            setusuarios(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }, []);

    const removerUsuarioPorId = (id: number): void => {
        setusuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id_user !== id));
    };

    const deletar = (id: number) => {
        const id_user = id;
        Api.post('/deleteUser', null, { params: { id_user } }).then((res) => {
            const data = res.data.result;
            handleClick();
            setMessage(data);
            removerUsuarioPorId(id_user!);
        }).catch(error => {
            alert(error.response.data.message)
        })
    }


    return (
        <BackgroundTriangle>
            {loading ? (
                <>
                    <GridStyled sx={{ boxShadow: '6px 10px 33px -12px rgba(0,0,0,0.75)', marginTop: 20, mb: 3, mx: 10, borderRadius: 5, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }} item xs={11} sm={11} md={8} lg={8} xl={8}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <img src={scene} alt="Estudantes" width={400} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <TypoNunito variant="h4" color="initial" fontWeight={'bold'} align='right'>
                                    Olá, {LoginServices.gotLogin.nome}! Seja bem vindo a página do administrador. Veja os usuários cadastrados na plataforma
                                </TypoNunito>
                            </Grid>
                        </Grid>
                    </GridStyled>


                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>


                    {usuarios.map(user => (
                        <GridStyled sx={{ boxShadow: '6px 10px 33px -12px rgba(0,0,0,0.75)', marginTop: 2, mx: 10, borderRadius: 5, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }} item xs={11} sm={11} md={3} lg={3} xl={3}>
                            <Box>
                                <TypoNunito ml={2} variant='h4'><b>{user.nome}</b></TypoNunito>
                                <TypoNunito ml={2} variant='overline'>{user.email}</TypoNunito>
                            </Box>

                            <IconButton onClick={() => deletar(user.id_user)}>
                                <DeleteIcon color='error' fontSize='large' />
                            </IconButton>
                        </GridStyled>
                    ))}
                </>
            ) : (
                <CircularProgress color='inherit' />
            )}
        </BackgroundTriangle>
    );
}

export default Listar;