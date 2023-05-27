import { Grid, Typography } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from "../../components/materialUiComponents/Grids";
import { TypoBebas } from "../../components/materialUiComponents/typography";
import Api from "../../api/Api";
import { useEffect, useState } from "react";
import { EventData } from "../../interfaces/Events";

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
                        <GridStyled key={event.cod_event} item xs={11} sm={6} md={3} lg={3} xl={3} sx={{ margin: 3, padding: 1, borderRadius: 3 }}>
                            <TypoBebas variant="h4" color="initial">{event.nome_evento}</TypoBebas>
                        </GridStyled>
                    ))}
                </>
            ) : (
                <h1>carregando</h1>
            )}
        </BackgroundTriangle>
    );
}

export default Home;