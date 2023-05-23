import { Grid, styled } from "@mui/material";
import { ChildrenProps } from "../../interfaces/Children";
import imagem from '../../assets/backgrounds/trianglifyBlue.png'

export const Background = styled(Grid)({
    height: '100vh',
    width: '100vw',
    backgroundColor: 'blue',
    backgroundImage: `url(${imagem})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: 'none',
});

export default function BackgroundTriangle({ children }: ChildrenProps) {
    return <Background container direction="row" justifyContent="center" alignItems="center">{children}</Background>;
}