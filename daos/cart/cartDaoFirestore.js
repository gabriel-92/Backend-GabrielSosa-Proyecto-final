const Container = require('../../controllers/containerFIRESTORE.js')

module.exports = class cartDao extends Container {
    constructor() {
        super('cart')
    }
}