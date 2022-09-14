

const knexSQL = require('./DB/SQL')

knexSQL.schema.hasTable('productos')
    .then(exists => {
        if (!exists) {
            return knexSQL.schema.createTable('productos', table => {
                table.increments('id')
                table.string('title')
                table.string('price')
                table.string('description')
                table.string('image')
                table.string('stock')
            })
                .then(() => console.log('tabla creada'))
                .catch(err => console.log(err))
            //.finally(() => knexSQL.destroy())
        }
        else {
            console.log('tabla ya existe')
        }
    })
    .catch(err => console.log(err))
    .finally(() => knexSQL.destroy())


