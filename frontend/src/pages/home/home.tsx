import { Grid, Typography } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from "../../components/materialUiComponents/Grids";
import { TypoBebas } from "../../components/materialUiComponents/typography";

const Home = () => {
    return (
        <BackgroundTriangle>
            <GridStyled item xs={11} sm={6} md={3} lg={3} xl={3}>
                <TypoBebas variant="h4" color="initial">Nome do curso</TypoBebas>
            </GridStyled>
        </BackgroundTriangle>
    );
}

export default Home;