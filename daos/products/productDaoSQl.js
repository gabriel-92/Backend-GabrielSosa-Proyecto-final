import Container from '../../controllers/containerSQL.js'


module.exports = class ProductDao extends Container {
  constructor() {
    super('products')
  }
}
