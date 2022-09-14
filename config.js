const config = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '152103386',
        database: 'ecommerce'
    }
}
//exportar el objeto de configuracion
module.exports = knex = require('knex')(config)