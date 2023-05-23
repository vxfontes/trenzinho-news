import { styled } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';

export const ColorButtonBlue = styled(Button)<ButtonProps>(({
    color: '#fff',
    backgroundColor: '#5a97f7',
    '&:hover': {
        backgroundColor: '#2c70dc',
    },
}));