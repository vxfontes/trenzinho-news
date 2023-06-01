import { AppBar, Toolbar, IconButton } from "@mui/material";
import logo from '../../assets/logo/onlyTA.png'
import { TypoBebas } from "../materialUiComponents/typography";

const Navbar = () => {
    return (
        <AppBar position="fixed" color="default">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <img src={logo} alt="Trenzinho acadêmico" height={50} />
                </IconButton>

                <TypoBebas variant="h5" color="#5a97f7">Trenzinho acadêmico</TypoBebas>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;