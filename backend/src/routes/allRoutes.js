const express = require('express');
const route = express.Router();


/* Rotas de Usuário */
const { exibirTodosUsuarios, userEvents } = require('../controllers/user/viewAll');
const { addUser } = require('../controllers/user/add');
const { deleteUser } = require('../controllers/user/delete');

/* Rotas de Evento */
const { eventosPorNome, eventosPorCodigo, eventosPorCategoria, 
        eventosPorModalidade, eventosPorAtuacao, eventosPorCertificado } = require('../controllers/event/research');
const { exibirEventosAdmin, exibirEventos, exibirTodasCategorias, exibirTodasAreas } = require('../controllers/event/viewAll');
const { addEvento } = require('../controllers/event/add');

/* exibição de todos os itens de uma tabela*/

/* Admin*/
route.get('/allEventsAdmin', exibirEventosAdmin); // exibir todos os eventos (apenas para admin)
route.get('/users', exibirTodosUsuarios); // exibir todos os usuarios comuns (apenas para admin)


/* Eventos*/
route.get('/allEvents', exibirEventos); // exibir todos os eventos que estão acontecendo ou vão acontecer
route.get('/allCategory', exibirTodasCategorias); // exibir todas as categorias
route.get('/allArea', exibirTodasAreas); // exibir todas as áreas de atuação




/* busca e retorno em uma tabela */

/* Eventos*/
route.post('/researchName', eventosPorNome); // Pesquisar evento por nome
route.post('/researchCod', eventosPorCodigo); // Pesquisar evento pelo seu código
route.post('/researchCategory', eventosPorCategoria); // Pesquisar evento por categoria
route.post('/researchMod', eventosPorModalidade); // Pesquisar evento por modalidade
route.post('/researchArea', eventosPorAtuacao); // Pesquisar evento por área de atuação
route.post('/researchCertificate', eventosPorCertificado); // Pesquisar evento por certificado


/* Usuários (Admin)*/
route.post('/userEvents', userEvents); //exibir todos os eventos selecionados por um usuário
route.post('/addUser', addUser);
route.post('/deleteUser', deleteUser);
route.post('/addEvento', addEvento);



module.exports = route;