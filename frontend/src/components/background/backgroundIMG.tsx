import { Grid, styled } from "@mui/material";
import { ChildrenProps } from "../../interfaces/Children";
import imagem from '../../assets/backgrounds/trianglifyBlue.png'

export const Background = styled(Grid)({
    minHeight: '100vh',
    maxHeight: '100%',
    minWidth: '100vw',
    maxWidth: '100%',
    backgroundColor: 'blue',
    backgroundImage: `url(${imagem})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: 'none',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    outline: 'none',
});

export default function BackgroundTriangle({ children }: ChildrenProps) {
    return <Background container direction="row" justifyContent="center" alignItems="center" spacing={1}>{children}</Background>;
}