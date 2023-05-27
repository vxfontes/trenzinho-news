const express = require('express')
const app = express();
<<<<<<< HEAD
const cors = require('cors');

const route = require('./routes/allRoutes')

app.use(cors());
=======

const route = require('./routes/allRoutes')

>>>>>>> a94f4954dfed65f91df68a087748d3679f25149f
app.use('/', route);

/* Definindo qual porta a aplicação vai rodar */
app.listen(3003, () => console.log("O servidor está rodando na porta 3003"));