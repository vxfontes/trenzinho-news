const express = require('express');
const app = express();
// const routes = require('./server/routes/allRoutes')


// app.use('/', routes);

/* Definindo qual porta a aplicação vai rodar */
app.listen(3003, () => console.log("O servidor está rodando na porta 3003"));