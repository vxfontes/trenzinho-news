const express = require('express');
const route = express.Router();

/* Rotas de Usuário */


/* Rotas de Evento */
const controllerAddEvent = require('../controllers/event/add');
const controllerViewEvent = require('../controllers/event/viewAll');
const controllerResearch = require('../controllers/event/research');

/*Definição das Rotas de Evento */
route.post('/addEvent', controllerAddEvent.add); // Cadastrar evento
route.post('/viewEvent', controllerViewEvent.viewAll); // Exibir todos os eventos cadastrados
route.post('/researchCategory', controllerResearch.category); // Pesquisar evento por categoria




module.exports = routes;