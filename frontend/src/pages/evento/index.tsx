import * as React from 'react';
import { useParams } from "react-router-dom";
import { CircularProgress, Grid, Divider } from "@mui/material";
import Api from '../../api/Api';
import { EventData } from '../../interfaces/Events';
import BackgroundTriangle from '../../components/background/backgroundIMG';
import scene from '../../assets/scenes/3.png';
import ChipsText from './chipsText';
import { ConfirmacaoEvento, DescricaoEvento, TituloEvento } from './infos';
import DialogSuccess from './dialog';


const EventoPage = () => {
    const cod_evento = useParams().id;

    const [event, setEvent] = React.useState<EventData>();
    const [loading, setloading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        Api.post('/researchCod', null, { params: { cod_evento } }).then((res) => {
            const data = res.data.result[0]
            setEvent(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }, []);

    return (
        <BackgroundTriangle>
            <DialogSuccess handleClose={handleClose} open={open} />

            {loading && event ? (
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{
                    backgroundColor: '#ffffffeb',
                    marginTop: 10,
                    width: '60%',
                    borderRadius: '20px',
                }}>
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11} mt={3}>
                        <TituloEvento event={event} />
                    </Grid>

                    <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <ChipsText event={event} />
                        <DescricaoEvento event={event} />
                    </Grid>

                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <img src={scene} alt="Estudantes" width={'100%'} />
                    </Grid>

                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11} mt={3} textAlign="center" mb={4}>
                        <Divider sx={{mb: 2}} />
                        <ConfirmacaoEvento event={event} onButtonClick={handleClickOpen} />
                    </Grid>
                </Grid>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </BackgroundTriangle>
    );
}

export default EventoPage;