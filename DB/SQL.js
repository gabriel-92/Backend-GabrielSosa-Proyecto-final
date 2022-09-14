// crear knex con la configuracion de la base de datos mysql

const config = require('../config')
const Knex = require('knex')

const knexSQL = Knex(config)

module.exports = knexSQL
