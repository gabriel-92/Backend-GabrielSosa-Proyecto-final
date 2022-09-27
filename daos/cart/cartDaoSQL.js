import Container from '../../controllers/containerSQL.js'

module.exports = class cartDao extends Container {
  constructor() {
    super('cart')
  }
}