const express = require('express');
const route = express.Router();

/* Rotas de Usuário */


/* Rotas de Evento */
const { exibirTodosUsuarios } = require('../controllers/user/viewAll');
const { eventosEInteresses } = require('../controllers/event/viewAll');
// const controllerAddEvent = require('../server/controllers/event/add');
// const controllerViewEvent = require('../server/controllers/event/viewAll');
// const controllerResearch = require('../controllers/event/research');

/* Definição das Rotas de Evento */
// route.post('/addEvent', controllerAddEvent.add); // Cadastrar evento
// route.post('/viewEvent', controllerViewEvent.viewAll); // Exibir todos os eventos cadastrados
// route.post('/researchCategory', controllerResearch.category); // Pesquisar evento por categoria

route.get('/users', exibirTodosUsuarios); // exibir todos os usuarios
route.get('/getAllEvents', eventosEInteresses); // exibir nossa tabela de eventos e quantidade de interessados



module.exports = route;