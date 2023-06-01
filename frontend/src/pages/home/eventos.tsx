import * as React from 'react';
import { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import Api from "../../api/Api";
import { EventData } from "../../interfaces/Events";
import CardEvento from "../../components/evento/cardEvento";


const ExibicaoDeEventos = () => {

    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        Api.get('/allEvents').then((res) => {
            const data = res.data.result

            setEvents(data)
        }).catch(error => {
            alert('houve um erro')
            console.log(error)
        }).finally(() => setloading(true))
    }, []);

    return (
        <>
            {loading ? (
                <Grid container direction="row" justifyContent="center" alignItems="center" mt={10}>
                    {events.map(event => (
                        <CardEvento event={event} key={event.cod_event} />
                    ))}
                </Grid>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </>
    );
}

export default ExibicaoDeEventos;