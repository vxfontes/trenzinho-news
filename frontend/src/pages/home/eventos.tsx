import { CircularProgress, Grid, Box } from "@mui/material";
import { EventData } from "../../interfaces/Events";
import CardEvento from "../../components/evento/cardEvento";
import WelcomeMessage from "./welcome";

interface ExibicaoProps {
    events: EventData[];
    loading: boolean;
}

const ExibicaoDeEventos = ({events, loading}: ExibicaoProps) => {
    return (
        <>
            {loading ? (
                <>
                    <Box sx={{
                        backgroundColor: '#ffffffeb',
                        marginTop: 5,
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
                </>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </>
    );
}

export default ExibicaoDeEventos;