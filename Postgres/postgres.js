// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'bike_assembly',
//     password: 'immu',
//     port: 5432, // default PostgreSQL port
// });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bike_assembly', 'postgres', 'immu', {
  host: 'localhost',
  dialect: 'postgres', // specify the dialect here
  logging: console.log, // enable logging
});

module.exports = sequelize; 

