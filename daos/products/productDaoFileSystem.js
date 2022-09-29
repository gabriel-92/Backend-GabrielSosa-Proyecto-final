
const Container = require('../../controllers/containerFilesystem')

module.exports = class ProductDao extends Container {
  constructor() {
    super('product.json')
  }
}