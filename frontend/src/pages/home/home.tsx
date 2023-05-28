import { Box, Chip, CircularProgress, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from "../../components/materialUiComponents/Grids";
import { TypoBebas, TypoNunito, TypoRoboto } from "../../components/materialUiComponents/typography";
import Api from "../../api/Api";
import { useEffect, useState } from "react";
import { EventData } from "../../interfaces/Events";
import { formatarData } from "../../utils/data";

const Home = () => {

    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        Api.get('/allEvents').then((res) => {
            console.log(res.data.result)
            const data = res.data.result

            setEvents(data)
        }).catch(error => {
            alert('houve um erro')
            console.log(error)
        }).finally(() => setloading(true))
    }, []);

    return (
        <BackgroundTriangle>
            {loading ? (
                <>
                    {events.map(event => (
                        <GridStyled key={event.cod_event} item xs={11} sm={6} md={3} lg={3} xl={3} sx={{ margin: 3, padding: 2, borderRadius: 3 }}>
                            <TypoBebas variant="h4" color="initial">{event.nome_evento}</TypoBebas>
                            <TypoRoboto variant="body1" color="initial">{formatarData(event.data)} - {event.horario.slice(0, 5)}</TypoRoboto>
                            <TypoNunito variant="body1" color="initial" mb={1}>
                                {event.descricao.slice(0, 200)}
                                {event.descricao.length > 200 ? '...' : event.descricao.charAt(event.descricao.length - 1) !== "." ? "." : ""}
                            </TypoNunito>

                            {event.area_de_atuacao.map(areas => (
                                <Chip size="small" sx={{ m: '2px' }} label={areas.nome} color='info' variant="outlined" />
                            ))}

                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <IconButton aria-label="" onClick={() => console.log('ok')}><AddCircleOutlineIcon color="primary" /></IconButton>
                            </Box>
                        </GridStyled>
                    ))}
                </>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </BackgroundTriangle>
    );
}

export default Home;