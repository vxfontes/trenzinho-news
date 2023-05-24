const express = require('express');
const route = express.Router();

/* Rotas de Usuário */

const { exibirTodosUsuarios, myEvents } = require('../controllers/user/viewAll');
const { addUser } = require('../controllers/user/add');
const { deleteUser } = require('../controllers/user/delete');

/* Rotas de Evento */
const { eventosPorNome, eventosPorCodigo, eventosPorCategoria, eventosPorAtuacao, eventosPorModalidade, eventosPorCertificado } = require('../controllers/event/research');
const { exibirEventos, eventosEInteresses, exibirTodasCategorias } = require('../controllers/event/viewAll');


/* exibição de todos os itens de uma tabela*/

/* Eventos*/
route.get('/getAllEvents', exibirEventos); // exibir todos os eventos que estão acontecendo ou vão acontecer
route.get('/eventsInterested', eventosEInteresses); // exibir nossa tabela de eventos e quantidade de interessados
route.get('/category', exibirTodasCategorias); // exibir todas as categorias

/* Usuários*/
route.get('/users', exibirTodosUsuarios); // exibir todos os usuarios


/* busca e retorno em uma tabela */

/* Eventos*/
route.post('/researchName', eventosPorNome); // Pesquisar evento por nome
route.post('/researchCod', eventosPorCodigo); // Pesquisar evento pelo seu código
route.post('/researchCategory', eventosPorCategoria); // Pesquisar evento por categoria
route.post('/researchArea', eventosPorAtuacao); // Pesquisar evento por área de atuação
route.post('/researchMod', eventosPorModalidade); // Pesquisar evento por modalidade
route.post('/researchCerti', eventosPorCertificado); // Pesquisar evento por certificado


/* Usuários */
route.post('/userEvents', myEvents); //exibir todos os eventos selecionados por um usuário
route.post('/addUser', addUser); 
route.post('/deleteUser', deleteUser);



module.exports = route;