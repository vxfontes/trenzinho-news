import * as React from 'react';
import { Grid, Alert, TextField, AlertColor, CircularProgress, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, MenuItem } from "@mui/material";
import BackgroundTriangle from "../../components/background/backgroundIMG";
import { GridStyled } from '../../components/materialUiComponents/Grids';
import scene from '../../assets/scenes/1.png';
import { TypoBebas, TypoNunito } from '../../components/materialUiComponents/typography';
import { ColorButtonBlue } from '../../components/materialUiComponents/Buttons';
import Api from '../../api/Api';
import LoginServices from '../../logic/LoginServices';
import { AreaProps, CategoriaProps } from '../home/home';


const AddEvento = () => {

    const id_admin = LoginServices.gotLogin.id_user;
    const [nome, setNome] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [vagas, setVagas] = React.useState("");
    const [carga_horaria, setCargaHoraria] = React.useState("");
    const [data, setData] = React.useState("");
    const [horario, setHorario] = React.useState("");
    const [cod_categoria, setCategoria] = React.useState('');
    const [areas, setAreaAtuacao] = React.useState("");
    const [certificado, setCertificado] = React.useState("");
    const [link, setLink] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [modalidade, setmodalidade] = React.useState(1);

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState<AlertColor>("error");
    const [message, setMessage] = React.useState("");
    const [area, setarea] = React.useState<AreaProps[]>([]);
    const [categoriaArray, setcategoriaArray] = React.useState<CategoriaProps[]>([]);

    React.useEffect(() => {
        Api.get('/allCategory').then((res) => {
            const data = res.data.result
            setcategoriaArray(data)
        }).catch(error => {
            setMessage(error.response.data.message)
        })

        Api.get('/allArea').then((res) => {
            const data = res.data.result
            setarea(data)
        }).catch(error => {
            setMessage(error.response.data.message)
        })
    }, []);

    const submit = () => {
        Api.post('/addEvent', null, {
            params: {
                id_admin, nome, local, vagas, carga_horaria, data, horario, cod_categoria, areas, certificado, link, descricao, modalidade
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
        if (nome !== '' && local !== '' && vagas !== '' && carga_horaria !== '' && data !== '' && horario !== ''
            && cod_categoria !== '' && areas !== '' && certificado !== '' && link !== '' && descricao !== '') {
            submit();
        } else {
            setAlert("error");
            setLoading(false);
            setMessage('Preencha todos os campos')
        }
    }

    return (
        <BackgroundTriangle>
            <GridStyled sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={10} md={10} sm={10} lg={10} xl={10} >
                {LoginServices.gotLogin.is_admin ? (
                    <Grid container rowSpacing={1} spacing={4} lg={12} xl={10}>

                        <Grid item xs={12}>
                            <TypoBebas mb={2} mt={2} variant="h3" align='center' color={'#5a97f7'}>Cadastro de Evento</TypoBebas>
                        </Grid>

                        {message !== "" && (
                            <Grid item xs={12}>
                                <Alert sx={{ mb: 2 }} severity={alert}>{message}</Alert>
                            </Grid>
                        )}

                        <Grid item alignItems="center" xs={6}>
                            <TextField sx={{ mb: 1 }} label="Nome do Evento" variant="filled" fullWidth onChange={(e) => setNome(e.target.value)} />
                            <TextField sx={{ mb: 1 }} label="Local" variant="filled" fullWidth onChange={(e) => setLocal(e.target.value)} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField sx={{ mb: 1 }} label="Número de Vagas" type='number' variant="filled" fullWidth onChange={(e) => setVagas(e.target.value)} />
                            <TextField sx={{ mb: 1 }} label="Carga Horária" type='number' variant="filled" fullWidth onChange={(e) => setCargaHoraria(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{ mb: 1 }} label="Data" type='date' variant="filled" fullWidth onChange={(e) => setData(e.target.value)} />
                            <TextField sx={{ mb: 1 }} label="Horário" variant="filled" type='time' fullWidth onChange={(e) => setHorario(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{ mb: 1 }} label="Categoria" select variant="filled" fullWidth onChange={(e) => setCategoria(e.target.value)}>
                                {categoriaArray.map(cat => <MenuItem key={cat.cod_categoria} value={cat.cod_categoria}>{cat.nome}</MenuItem>)}
                            </TextField>
                            <TextField sx={{ mb: 1 }} label="Área de Atuação" select variant="filled" fullWidth onChange={(e) => setAreaAtuacao(e.target.value)}>
                                {area.map(cat => <MenuItem key={cat.codigo} value={cat.codigo}>{cat.nome}</MenuItem>)}
                            </TextField>
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
                            <TextField fullWidth sx={{ mb: 1 }} select label="Selecione uma Modalidade" variant="filled" defaultValue={1} onChange={(e) => { setmodalidade(Number(e.target.value)) }}>
                                <MenuItem key={1} value={1}>Presencial</MenuItem>
                                <MenuItem key={2} value={2}>Online</MenuItem>
                            </TextField>
                            <TextField label="Link do Evento" variant="filled" fullWidth onChange={(e) => setLink(e.target.value)} />
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
                ) : (
                    <TypoNunito variant='h5'><b>Você precisa ser administrador para acessar essa página</b></TypoNunito>
                )}
            </GridStyled>
        </BackgroundTriangle >

    );
}

export default AddEvento;