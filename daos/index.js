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
    classProductDao = require('./mongo/productDaoMongo.js')
    break
  case 'FIRESTORE':
    //classCartDao = require('./firestore/cartDao.js')
    //classProductDao = require('./firestore/productDao.js')
    break
  case 'SQLITE3':
    //classCartDao = require('./sqlite3/cartDao.js')
    //classProductDao = require('./sqlite3/productDao.js')
    break
  case 'MEMORY':
  //classCartDao = require('./memory/cartDao.js')
  //classProductDao = require('./memory/productDao.js')
  default:
    //classCartDao = require('./sqlite/cartDao.js')//SQL
    //classProductDao = require('./sqlite/productDao.js')//SQL
    break
}

let cartDao = new classCartDao()
let productDao = new classProductDao()

export { productDao, cartDao } //,