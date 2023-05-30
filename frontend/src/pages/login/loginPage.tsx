import { Grid, Typography, TextField, Box } from "@mui/material";
import { useState } from "react";
import Api from "../../api/Api";
import MeuSVG from "../../assets/logo/trenzinhoAcademico.svg";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { ColorButtonBlue, ColorButtonWhite } from "../../components/materialUiComponents/Buttons";
import { GridStyled } from "../../components/materialUiComponents/Grids";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        Api.post('/login', null, {params: {email, password}}).then((res) => {
            console.log(res.data.result)

            const resultString = JSON.stringify(res.data.result);
            localStorage.setItem('usuarioLogado', resultString);
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    return (
        <BackgroundTriangle>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={12} sm={12} lg={12} xl={12}>
                <GridStyled sx={{ px: 4 }} item xs={11} sm={6} md={3} lg={3} xl={3}>
                    <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
                        <img src={MeuSVG} alt="Trenzinho" width={'60%'} />
                    </Box>

                    <Typography mb={2} variant="h3" color={'#5a97f7'} fontFamily={['Bebas Neue', 'cursive'].join(',')}>Login</Typography>

                    <TextField sx={{ mb: 1 }} label="Digite seu email" variant="filled" fullWidth onChange={(e) => setEmail(e.target.value)} /> <br />
                    <TextField sx={{ mb: 3 }} label="Digite sua senha" variant="filled" fullWidth onChange={(e) => setPassword(e.target.value)} />

                    <ColorButtonBlue sx={{ mb: 1 }} fullWidth onClick={() => submit()}>Entrar</ColorButtonBlue>
                    <ColorButtonWhite fullWidth>Cadastrar</ColorButtonWhite>

                </GridStyled>
            </Grid>
        </BackgroundTriangle>
    );
}

export default LoginPage;