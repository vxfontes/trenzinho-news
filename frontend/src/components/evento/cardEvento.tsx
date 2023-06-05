import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { EventData } from "../../interfaces/Events";
import { GridStyled } from "../materialUiComponents/Grids";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TypoBebas, TypoNunito, TypoRoboto } from "../materialUiComponents/typography";
import { formatarData } from "../../utils/data";
import { useNavigate } from "react-router-dom";


interface EventoProps {
    event: EventData;
}

const CardEvento = ({event}: EventoProps) => {
    const navigate = useNavigate();

    return (
        <GridStyled key={event.cod_event} item xs={11} sm={6} md={3} lg={3} xl={3} sx={{ margin: 2, padding: 1, borderRadius: 3, boxShadow: '6px 10px 33px -12px rgba(0,0,0,0.75)    ' }}>
            <TypoBebas p={1} variant="h4" color="initial">{event.nome_evento}</TypoBebas>
            <TypoRoboto pl={1} variant="body1" color="initial">{formatarData(event.data_evento)} - {event.horario.slice(0, 5)}</TypoRoboto>
            <TypoNunito pl={1} variant="body1" color="initial" mb={1}>
                {event.descricao.slice(0, 200)}
                {event.descricao.length > 200 ? '...' : event.descricao.charAt(event.descricao.length - 1) !== "." ? "." : ""}
            </TypoNunito>

            {event.area_de_atuacao.map(areas => (
                <Chip key={areas.cod_area} size="small" sx={{ m: '2px', ml: 1 }} label={areas.nome} color='info' variant="outlined" />
            ))}

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <IconButton aria-label="" onClick={() => navigate(`/event/${event.cod_event}`)}><AddCircleOutlineIcon color="primary" /></IconButton>
            </Box>
        </GridStyled>
    );
}

export default CardEvento;