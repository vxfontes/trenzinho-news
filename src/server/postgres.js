const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'trenzinho',
    password: '123456', // senha no pc de vocês
    port: 5432, // porta padrão do PostgreSQL
});

pool.on('connect', () => {
    console.log('Base de Dados conectado com sucesso!');
});

module.exports = pool;