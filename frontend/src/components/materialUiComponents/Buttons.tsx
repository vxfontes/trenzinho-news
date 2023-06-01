import { styled } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';

export const ColorButtonBlue = styled(Button)<ButtonProps>(({
    color: '#fff',
    backgroundColor: '#5a97f7',
    '&:hover': {
        backgroundColor: '#2c70dc',
    },
}));

export const ColorButtonWhite = styled(Button)<ButtonProps>(({
    color: '#5a97f7',
    backgroundColor: '#e2e2e2',
    '&:hover': {
        backgroundColor: '#b3b1b1',
    },
}));

export const ColorButtonDisabled = styled(Button)<ButtonProps>(({
    "&.Mui-disabled": {
        background: "#f2f0fa",
        color: "#515151"
    }
}));