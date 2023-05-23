const express = require('express');
const route = express.Router();

/* Rotas de Usuário */
const { exibirTodosUsuarios, myEvents } = require('../controllers/user/viewAll');

/* Rotas de Evento */
const { eventosPorNome, eventosPorCodigo, eventosPorCategoria } = require('../controllers/event/research');
const { exibirEventos, eventosEInteresses, exibirTodasCategorias } = require('../controllers/event/viewAll');


/* exibição de todos os itens de uma tabela*/
route.get('/getAllEvents', exibirEventos); // exibir todos os eventos que estão acontecendo ou vão acontecer
route.get('/eventsInterested', eventosEInteresses); // exibir nossa tabela de eventos e quantidade de interessados
route.get('/users', exibirTodosUsuarios); // exibir todos os usuarios
route.get('/category', exibirTodasCategorias); // exibir todas as categorias

/* busca e retorno em uma tabela */
route.post('/researchName' , eventosPorNome); // Pesquisar evento por nome
route.post('/researchCod' , eventosPorCodigo); // Pesquisar evento pelo seu código
route.post('/researchCategory', eventosPorCategoria); // Pesquisar evento por categoria
route.post('/myEvents', myEvents); //exibir todos os eventos selecionados por um usuário



module.exports = route;