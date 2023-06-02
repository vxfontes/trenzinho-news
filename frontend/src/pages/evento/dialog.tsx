import { Dialog, DialogTitle, DialogContent, Button, AlertColor, Alert, CircularProgress } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/api.js";
import { TypoNunito } from "../../components/materialUiComponents/typography";
import { EventData } from "../../interfaces/Events";
import LoginServices from "../../logic/LoginServices";

interface DialogProps {
    open: boolean
    handleClose: () => void;
    event: EventData
}

const DialogSuccess = ({ open, handleClose, event }: DialogProps) => {

    const navigate = useNavigate();
    const id_user = LoginServices.gotLogin.id_user;
    const cod_evento = event.cod_event;
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState<AlertColor>("error");
    const [message, setMessage] = React.useState("");

    const submit = () => {
        Api.post('/addInteresse', null, { params: { id_user, cod_evento } }).then((res) => {
            setAlert("success");
            setMessage(res.data.result)
        }).catch(error => {
            setAlert("error");
            setLoading(false);
            setMessage(error.response.data.message)
        })
    }

    const handleSubmit = () => {
        setMessage("")
        setLoading(true);
        submit();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {message !== "" && (
                <Alert sx={{ mb: 2 }} severity={alert}>{message}</Alert>
            )}
            <DialogTitle id="alert-dialog-title">
                {LoginServices.logged ? `Obrigada por demonstrar interesse, ${LoginServices.gotLogin.nome}!` : 'Primeiro é necessário realizar o login para demonstrar interesse'}
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
                {LoginServices.logged ? (
                    <>
                        <TypoNunito variant="body1" color="initial" align='left'>Segue o link da inscrição oficial do evento, clique abaixo para ser redirecionado</TypoNunito>

                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            {loading && (
                                <CircularProgress color="inherit" size={20} sx={{ px: 1 }} />
                            )}
                            clique aqui
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" color="success" onClick={() => navigate('/login')}>
                        Fazer login
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default DialogSuccess;