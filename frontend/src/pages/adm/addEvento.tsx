import * as React from 'react';
import { Grid, Alert, TextField, AlertColor, CircularProgress, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from '../../components/materialUiComponents/Grids';
import scene from '../../assets/scenes/1.png';
import { TypoBebas, TypoNunito } from '../../components/materialUiComponents/typography';
import { ColorButtonBlue } from '../../components/materialUiComponents/Buttons';
import Api from '../../api/Api';


const AddEvento = () => {

    const [idAdmin, setIdAdmin] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [vagas, setVagas] = React.useState("");
    const [cargaHoraria, setCargaHoraria] = React.useState("");
    const [data, setData] = React.useState("");
    const [horario, setHorario] = React.useState("");
    const [categoria, setCategoria] = React.useState("");
    const [areaAtuacao, setAreaAtuacao] = React.useState("");
    const [certificado, setCertificado] = React.useState("");
    const [link, setLink] = React.useState("");
    const [descricao, setDescricao] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState<AlertColor>("error");
    const [message, setMessage] = React.useState("");


    const submit = () => {
        Api.post('/addEvent', null, {
            params: {
                idAdmin, nome, local, vagas, cargaHoraria, data, horario, categoria, areaAtuacao, certificado, link, descricao
            }
        }).then((res) => {
            setAlert("success");
            setMessage(res.data.result);

        }).catch(error => {
            setAlert("error");
            setLoading(false);
            setMessage(error.response.data.message)
        })
    }

    const handleSubmit = () => {
        setMessage("")
        setLoading(true);
        if (idAdmin !== '' && nome !== '' && local !== '' && vagas !== '' && cargaHoraria !== '' && data !== '' && horario !== ''
            && categoria !== '' && areaAtuacao !== '' && certificado !== '' && link !== '' && descricao !== '') {
            submit();
        }
    }

    return (
        <BackgroundTriangle>

            <GridStyled sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={10} md={10} sm={10} lg={10} xl={10} >

                <Grid container rowSpacing={1} spacing={4} lg={12} xl={10}>

                    <Grid item xs={12}>
                        <TypoBebas mb={2} mt={2} variant="h3" align='center' color={'#5a97f7'}>Cadastro de Evento</TypoBebas>
                    </Grid>

                    {message !== "" && (
                        <Alert sx={{ mb: 2 }} severity={alert}>{message}</Alert>
                    )}

                    <Grid item alignItems="center" xs={6}>
                        <TextField sx={{ mb: 2 }} label="Nome do Evento" variant="filled" fullWidth onChange={(e) => setNome(e.target.value)} />
                        <TextField sx={{ mb: 2 }} label="Local" variant="filled" fullWidth onChange={(e) => setLocal(e.target.value)} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField sx={{ mb: 2 }} label="Número de Vagas" type='number' variant="filled" fullWidth onChange={(e) => setVagas(e.target.value)} />
                        <TextField sx={{ mb: 2 }} label="Carga Horária" type='number' variant="filled" fullWidth onChange={(e) => setCargaHoraria(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField sx={{ mb: 2 }} label="Data" variant="filled" fullWidth onChange={(e) => setData(e.target.value)} />
                        <TextField sx={{ mb: 2 }} label="Horário" variant="filled" fullWidth onChange={(e) => setHorario(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField sx={{ mb: 2 }} label="Categoria" select variant="filled" fullWidth onChange={(e) => setCategoria(e.target.value)} />
                        <TextField sx={{ mb: 2 }} label="Área de Atuação" select variant="filled" fullWidth onChange={(e) => setAreaAtuacao(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Emite Certificado?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                row
                                onChange={(e) => setCertificado(e.target.value)}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ mb: 2 }} label="Link do Evento" variant="filled" fullWidth onChange={(e) => setLink(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ mb: 2 }}
                            label="Descrição" multiline minRows={4} maxRows={4}
                            placeholder="Faça uma breve descrição do evento" variant="filled"
                            fullWidth onChange={(e) => setDescricao(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ColorButtonBlue sx={{ mb: 1 }} fullWidth onClick={handleSubmit}>
                            {loading && (
                                <CircularProgress color="inherit" size={20} sx={{ px: 1 }} />
                            )}
                            cadastrar
                        </ColorButtonBlue>
                    </Grid>
                </Grid>
            </GridStyled>
        </BackgroundTriangle>

    );
}

export default AddEvento;