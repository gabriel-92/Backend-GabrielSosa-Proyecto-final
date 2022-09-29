const ContainerFilesystem = require('../../controllers/containerFilesystem')

module.exports = class cartDao extends ContainerFilesystem {
    constructor() {
        super('cart.json')
    }
}