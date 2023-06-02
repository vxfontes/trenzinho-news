import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from "../../components/materialUiComponents/Grids";
import scene from '../../assets/scenes/6.png'
import LoginServices from "../../logic/LoginServices";
import { TypoNunito } from "../../components/materialUiComponents/typography";
import { Grid, CircularProgress } from "@mui/material";
import { EventData } from "../../interfaces/Events";
import { useEffect, useState } from "react";
import Api from "../../api/api.js";
import CardEvento from "../../components/evento/cardEvento";

const UsuarioInteresses = () => {
    const user = LoginServices.gotLogin;
    const login = LoginServices.logged;
    const id_user = user.id_user
    const texto = !login ? (" você precisa estar logado para acessar a área do usuário") : (` ${user.nome}! Seja bem vindo(a) a sua estante de eventos.`);
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        Api.post('/userEvents', null, { params: { id_user } }).then((res) => {
            const data = res.data.result
            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }, []);
    return (
        <BackgroundTriangle>
            <GridStyled sx={{ boxShadow: '6px 10px 33px -12px rgba(0,0,0,0.75)', marginTop: 15 }} item xs={11} sm={11} md={6} lg={6} xl={6}>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <img src={scene} alt="Estudantes" width={400} />
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                        <TypoNunito variant="h4" color="initial" fontWeight={'bold'} align='right'>
                            Olá, {texto}
                        </TypoNunito>
                    </Grid>
                </Grid>
            </GridStyled>

            {loading ? (
                <Grid sx={{ marginTop: 5 }} container direction="row" justifyContent="center" alignItems="center">
                    {events.map(event => (
                        <CardEvento event={event} key={event.cod_event} />
                    ))}
                </Grid>
            ) : (
                <CircularProgress />
            )}

        </BackgroundTriangle>
    );
}

export default UsuarioInteresses;