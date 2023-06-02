import BackgroundTriangle from "../../components/background/backgroundIMG";
import ExibicaoDeEventos from "./eventos";
import { Grid, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Box, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { EventData } from "../../interfaces/Events";
import Api from "../../api/Api";

interface CategoriaProps {
    cod_categoria: number;
    nome: string;
}

interface AreaProps {
    codigo: number;
    nome: string;
}

const Home = () => {
    const [value, setValue] = useState("allEvents");
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setloading] = useState(false);
    const [categoria, setcategoria] = useState<CategoriaProps[]>([]);
    const [cod_modalidade, setmodalidade] = useState<number>();
    const [cod_categoria, setcod_categoria] = useState<number>();
    const [area, setarea] = useState<AreaProps[]>([]);
    const [cod_area, setcod_area] = useState<number>();

    const getRoutes = () => {
        setloading(false);

        Api.get(`/${value}`).then((res) => {
            const data = res.data.result
            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }

    const postCategory = () => {
        setloading(false);

        Api.post(`/researchCategory`, null, { params: { cod_categoria } }).then((res) => {
            const data = res.data.result
            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }

    const postModalidade = () => {
        setloading(false);

        Api.post(`/researchMod`, null, { params: { cod_modalidade } }).then((res) => {
            const data = res.data.result
            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }

    const postArea = () => {
        setloading(false);

        Api.post(`/researchArea`, null, { params: { cod_area } }).then((res) => {
            const data = res.data.result
            setEvents(data)
        }).catch(error => {
            alert(error.response.data.message)
        }).finally(() => setloading(true))
    }



    useEffect(() => {
        Api.get('/allCategory').then((res) => {
            const data = res.data.result
            setcategoria(data)
        }).catch(error => {
            alert(error.response.data.message)
        })

        Api.get('/allArea').then((res) => {
            const data = res.data.result
            setarea(data)
        }).catch(error => {
            alert(error.response.data.message)
        })

        if (value === 'researchCategory') {
            postCategory()
        } else if (value === 'researchArea') {
            postArea()
        } else if (value === 'researchMod') {
            postModalidade()
        } else {
            getRoutes()
        }
    }, [value, cod_categoria, cod_modalidade, cod_area]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <BackgroundTriangle>

            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} mt={15}>
                <Grid sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 3 }} item xs={8} sm={8} md={8} lg={8} xl={8}>
                    <FormControl>
                        <FormLabel>Filtros</FormLabel>
                        <RadioGroup row value={value} onChange={handleChange}>
                            <FormControlLabel value="allEvents" control={<Radio />} label="Todos os eventos" />
                            <FormControlLabel value="eventsMorning" control={<Radio />} label="Pela manhã" />
                            <FormControlLabel value="eventsAfternoon" control={<Radio />} label="Pela tarde" />
                            <FormControlLabel value="eventsNight" control={<Radio />} label="Pela noite" />
                            <FormControlLabel value="researchCertificateGet" control={<Radio />} label="Possui certificado" />
                            <FormControlLabel value="researchCategory" control={<Radio />} label="Por categoria" />
                            <FormControlLabel value="researchMod" control={<Radio />} label="Por Modalidade" />
                            <FormControlLabel value="researchArea" control={<Radio />} label="Por área de atuação" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

                {value === 'researchCategory' && (
                    <Grid sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 3 }} item xs={5} sm={5} md={5} lg={5} xl={5} mt={3}>
                        <TextField sx={{ width: '100%', mt: 2, ml: 1 }} select label="Selecione uma categoria" defaultValue={categoria[0].cod_categoria} onChange={(e) => { setcod_categoria(Number(e.target.value)) }}>
                            {categoria.map(cat => <MenuItem key={cat.cod_categoria} value={cat.cod_categoria}>{cat.nome}</MenuItem>)}
                        </TextField>
                    </Grid>
                )}

                {value === 'researchMod' && (
                    <Grid sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 3 }} item xs={5} sm={5} md={5} lg={5} xl={5} mt={3}>
                        <TextField sx={{ width: '100%', mt: 2, ml: 1 }} select label="Selecione uma Modalidade" defaultValue={1} onChange={(e) => { setmodalidade(Number(e.target.value)) }}>
                            <MenuItem key={1} value={1}>Presencial</MenuItem>
                            <MenuItem key={2} value={2}>Online</MenuItem>
                        </TextField>
                    </Grid>
                )}

                {value === 'researchArea' && (
                    <Grid sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 3 }} item xs={5} sm={5} md={5} lg={5} xl={5} mt={3}>
                        <TextField sx={{ width: '100%', mt: 2, ml: 1 }} select label="Selecione uma área de atuação" defaultValue={1} onChange={(e) => { setcod_area(Number(e.target.value)) }}>
                            {area.map(cat => <MenuItem key={cat.codigo} value={cat.codigo}>{cat.nome}</MenuItem>)}
                        </TextField>
                    </Grid>
                )}
            </Grid>

            <ExibicaoDeEventos events={events} loading={loading} />
        </BackgroundTriangle>
    );
}

export default Home;