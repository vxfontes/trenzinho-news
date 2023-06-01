import { useEffect, useState } from "react";
import { CircularProgress, Grid, Box } from "@mui/material";
import Api from "../../api/Api";
import { EventData } from "../../interfaces/Events";
import CardEvento from "../../components/evento/cardEvento";
import WelcomeMessage from "./welcome";


const ExibicaoDeEventos = () => {

    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        Api.get('/allEvents').then((res) => {
            const data = res.data.result

            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{
                    backgroundColor: '#ffffffeb',
                    marginTop: 30,
                    marginBottom: 2,
                    maxWidth: '90%',
                    borderRadius: '20px',
                }}>
                    <WelcomeMessage />

                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {events.map(event => (
                            <CardEvento event={event} key={event.cod_event} />
                        ))}
                    </Grid>
                </Box>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </>
    );
}

export default ExibicaoDeEventos;