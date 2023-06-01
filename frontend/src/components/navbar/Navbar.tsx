import * as React from 'react';
import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem } from "@mui/material";
import logo from '../../assets/logo/onlyTA.png'
import { TypoBebas } from "../materialUiComponents/typography";
import PersonIcon from '@mui/icons-material/Person';
import { getLogin, isLogged, removerUsuarioLogado } from '../../logic/getLogin';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const Navbar = () => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const admin = getLogin().is_admin;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="fixed" color="default">
                <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
                    <Box display={'flex'} alignItems='center'>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <img src={logo} alt="Trenzinho acadêmico" height={50} />
                        </IconButton>
                        <TypoBebas variant="h5" color="#5a97f7">Trenzinho acadêmico</TypoBebas>
                    </Box>


                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
                        <PersonIcon fontSize="large" color="primary" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {isLogged() ? (
                    <Box>
                        <MenuItem onClick={handleClose}>Meu perfil</MenuItem>

                        <Divider />
                        {admin && (
                            <Box>
                                <MenuItem onClick={handleClose}>Cadastrar evento</MenuItem>
                                <MenuItem onClick={handleClose}>Usuários existentes</MenuItem>
                            </Box>
                        )}

                        <Divider />

                        <MenuItem onClick={() => { removerUsuarioLogado(); setAnchorEl(null); }}>Sair</MenuItem>
                    </Box>
                ) : (
                    <MenuItem onClick={() => { navigate('/login'); setAnchorEl(null); }}>Fazer login</MenuItem>
                )}
            </Menu>
        </>
    );
}

export default Navbar;