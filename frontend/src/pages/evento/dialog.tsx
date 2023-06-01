import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { TypoNunito } from "../../components/materialUiComponents/typography";
import LoginServices from "../../logic/LoginServices";

interface DialogProps {
    open: boolean
    handleClose: () => void;
}

const DialogSuccess = ({open, handleClose}: DialogProps) => {
    return (
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Obrigada por demonstrar interesse, {LoginServices.gotLogin.nome}!
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <TypoNunito variant="body1" color="initial" align='left'>Segue o link da inscrição oficial do evento, clique abaixo para ser redirecionado</TypoNunito>

                    <Button variant="contained" color="success">
                        clique aqui
                    </Button>
                </DialogContent>
            </Dialog>
    );
}
 
export default DialogSuccess;