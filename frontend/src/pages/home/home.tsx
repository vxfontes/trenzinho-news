import * as React from "react";
import { CircularProgress } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import Api from "../../api/Api";
import { useEffect, useState } from "react";
import { EventData } from "../../interfaces/Events";
import CardEvento from "../../components/evento/cardEvento";

const Home = () => {

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
        <BackgroundTriangle>
            {loading ? (
                <React.Fragment key={1}>
                    {events.map(event => (
                        <CardEvento event={event} />
                    ))}
                </React.Fragment>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </BackgroundTriangle>
    );
}

export default Home;