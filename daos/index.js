import dotenv from "dotenv";
dotenv.config();

const DB_ENGINE = process.env.DB_ENGINE

let classCartDao
let classProductDao

switch (DB_ENGINE) {
  case 'MYSQL':
    classCartDao = require('./cart/cartDaoSQL.js')
    classProductDao = require('./products/productDaoSQL.js')
    break
  case 'MONGO':
    classCartDao = require('./cart/cartDaoMongo.js')
    classProductDao = require('./products/productDaoMongo.js')
    break
  case 'FIRESTORE':
    classCartDao = require('./cart/cartDaoFirestore.js')
    classProductDao = require('./products/productDaoFirestore.js')
    break
  case 'MEMORY':
    classCartDao = require('./cart/cartDaoMemory.js')
    classProductDao = require('./products/productDaoMemory.js')
    break
  case 'FILESYSTEM':
    classCartDao = require('./cart/cartDaoFileSystem.js')
    classProductDao = require('./products/productDaoFileSystem.js')
  default:
    classCartDao = require('./cart/cartDaoFileSystem.js')
    classProductDao = require('./products/productDaoFileSystem.js')
}

let cartDao = new classCartDao()
let productDao = new classProductDao()

export { productDao, cartDao } //,