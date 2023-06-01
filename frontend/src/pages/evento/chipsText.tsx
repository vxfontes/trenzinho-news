import { EventData } from "../../interfaces/Events";
import FaceIcon from '@mui/icons-material/Face';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { CustomChipBlue, CustomChipGreen, CustomChipPurple, CustomChipRed, CustomChipYellow } from '../../components/materialUiComponents/chips';


interface EventoProps {
    event: EventData;
}

const ChipsText = ({ event }: EventoProps) => {
    const certificado = event.certificado ? 'Possui certificado' : 'Não possui certificado';

    return (
        <>
            <CustomChipBlue icon={<FaceIcon />} label={`${event.vagas} vagas`} color='primary' sx={{ my: 1 }} />
            {event.certificado ? (
                <CustomChipGreen icon={<ArticleIcon color='inherit' />} label={certificado} sx={{ my: 1, mx: 1 }} />
            ) : (
                <CustomChipRed icon={<ArticleIcon color='inherit' />} label={certificado} sx={{ my: 1, mx: 1 }} />
            )}
            <CustomChipYellow icon={<SchoolIcon />} label={event.nome_modali} color='warning' sx={{ my: 1 }} />
            <CustomChipPurple icon={<WatchLaterIcon color='inherit' />} label={`${event.carga_horaria} horas`} sx={{ my: 1, mx: 1 }} />
        </>
    );
}

export default ChipsText;