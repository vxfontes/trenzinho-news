import { Divider, Button, ButtonGroup } from "@mui/material";
import { EventData } from '../../interfaces/Events';
import { TypoBebas, TypoNunito } from '../../components/materialUiComponents/typography';
import { formatarData } from '../../utils/data';
import { ColorButtonDisabled } from '../../components/materialUiComponents/Buttons';

interface EventoProps {
    event: EventData;
}

interface BtnProps extends EventoProps {
    onButtonClick: () => void;
}

export const TituloEvento = ({ event }: EventoProps) => {
    return (
        <>
            <TypoBebas variant='h4' align='center'>{event.nome_evento}</TypoBebas>
            <TypoBebas variant='h6' align='center'>{event.nome_categ}</TypoBebas>
            <Divider />
        </>
    );
}

export const DescricaoEvento = ({ event }: EventoProps) => {
    return (
        <>
            <TypoNunito variant="body1" color="initial"><b>Sobre o evento:</b> <br /> {event.descricao}</TypoNunito>
            <TypoNunito pt={1} variant="body1" color="initial"><b>Data e horário:</b> {formatarData(event.data_evento)} - {event.horario.slice(0, 5)}</TypoNunito>
            <TypoNunito variant="body1" color="initial"><b>Local do evento:</b> {event.local_evento}</TypoNunito>
        </>
    );
}

export const ConfirmacaoEvento = ({ event, onButtonClick }: BtnProps) => {
    return (
        <>
            <TypoBebas variant='h5' align='center'>Tem interesse?</TypoBebas>

            <ButtonGroup variant="contained">
                <Button variant="contained" color="primary" onClick={onButtonClick}>
                    demonstrar interesse
                </Button>
                <ColorButtonDisabled variant="text" disabled>
                    {event.total_interessados} interessados
                </ColorButtonDisabled>
            </ButtonGroup>
        </>
    );
}