const express = require('express');
const route = express.Router();

/* Rotas de Usuário */


/* Rotas de Evento */
const { exibirTodosUsuarios } = require('../controllers/user/viewAll');
const { eventosPorCategoria } = require('../controllers/event/research');
const { eventosEInteresses, exibirTodasCategorias } = require('../controllers/event/viewAll');

// const controllerAddEvent = require('../server/controllers/event/add');
// const controllerViewEvent = require('../server/controllers/event/viewAll');
// const controllerResearch = require('../controllers/event/research');

/* Definição das Rotas de Evento */
// route.post('/addEvent', controllerAddEvent.add); // Cadastrar evento
// route.post('/viewEvent', controllerViewEvent.viewAll); // Exibir todos os eventos cadastrados
// route.post('/researchCategory', controllerResearch.category); // Pesquisar evento por categoria

/* exibição de todos os itens de uma tabela*/
route.get('/getAllEvents', eventosEInteresses); // exibir nossa tabela de eventos e quantidade de interessados
route.get('/users', exibirTodosUsuarios); // exibir todos os usuarios
route.get('/categorias', exibirTodasCategorias); // exibir todos os usuarios

/* busca e retorno em uma tabela */
route.post('/researchCategory', eventosPorCategoria); // Pesquisar evento por categoria



module.exports = route;