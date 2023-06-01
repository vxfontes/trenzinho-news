import * as React from 'react';
import { Grid, Alert, TextField, AlertColor, CircularProgress } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from '../../components/materialUiComponents/Grids';
import scene from '../../assets/scenes/1.png';
import { TypoBebas, TypoNunito } from '../../components/materialUiComponents/typography';
import { ColorButtonBlue } from '../../components/materialUiComponents/Buttons';
import Api from '../../api/Api';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {

    const admin = false;
    const navigate = useNavigate();
    const [nome, setnome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState<AlertColor>("error");
    const [message, setMessage] = React.useState("");

    const submit = () => {
        console.log(password)
        Api.post('/addUser', null, { params: { admin, nome, email, password } }).then((res) => {
            setAlert("success");
            setMessage(res.data.message)

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }).catch(error => {
            setAlert("error");
            setLoading(false);
            setMessage(error.response.data.message)
        })
    }

    const handleSubmit = () => {
        setMessage("")
        setLoading(true);
        if (email !== '' && password !== '' && nome !== '') {
            submit();
        }
    }

    return (
        <BackgroundTriangle>

            <GridStyled sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={10} md={10} sm={10} lg={10} xl={10}>

                <Grid item xs={5} md={5} sm={5} lg={5} xl={5}>
                    <TypoBebas mt={2} variant="h3" color={'#5a97f7'}>Cadastre-se</TypoBebas>
                    <TypoNunito mb={2} variant="h6" color='inherit'>Olá estudante, venha se juntar a nós!</TypoNunito>

                    {message !== "" && (
                        <Alert sx={{ mb: 2 }} severity={alert}>{message}</Alert>
                    )}

                    <TextField sx={{ mb: 1 }} label="Digite seu nome" variant="filled" fullWidth onChange={(e) => setnome(e.target.value)} /> <br />
                    <TextField sx={{ mb: 1 }} label="Digite seu email" variant="filled" fullWidth onChange={(e) => setEmail(e.target.value)} /> <br />
                    <TextField sx={{ mb: 3 }} label="Digite sua senha" type='password' variant="filled" fullWidth onChange={(e) => setPassword(e.target.value)} />


                    <ColorButtonBlue sx={{ mb: 1 }} fullWidth onClick={handleSubmit}>
                        {loading && (
                            <CircularProgress color="inherit" size={20} sx={{ px: 1 }} />
                        )}
                        cadastro
                    </ColorButtonBlue>
                </Grid>

                <Grid item xs={5} md={5} sm={5} lg={5} xl={5}>
                    <img src={scene} alt="Estudantes" width={'100%'} />
                </Grid>

            </GridStyled>
        </BackgroundTriangle>
    );
}

export default Cadastro;