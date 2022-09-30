const Container = require('../../controllers/containerFIRESTORE.js')

module.exports = class ProductDao extends Container {
    constructor() {
        super('products')
    }
}