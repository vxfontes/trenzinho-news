const express = require('express')
const app = express();

const route = require('./routes/allRoutes')

app.use('/', route);

/* Definindo qual porta a aplicação vai rodar */
app.listen(3003, () => console.log("O servidor está rodando na porta 3003"));