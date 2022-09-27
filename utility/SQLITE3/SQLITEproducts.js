
// const createTableProducts = async () => {
//   try {
//     await clienteSqlIte.schema.createTable("products", (table) => {
//       table.increments("id");
//       table.string("title");
//       table.string("image");
//       table.integer("price");
//       table.integer("stock");
//       table.string("description");
//       table.string("category");
//     });

//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("Tabla products creada");
//   }
// };
// createTableProducts();



//insertar en la tabla products de sqlite 3 el archivo products.json
// const products = require("./public/mockup/product.json");
// const productsSqlite = products.map((product) => {
//           return {
//                     title: product.title,
//                     price: product.price,
//                     image: product.image,
//                     price: product.price,
//                     stock: 50,
//                     description: product.description,
//                     category: product.category,
//                     id: product.id
//           }
// })
// clienteSqlIte('products').insert(productsSqlite).then(() => {
//           console.log('Productos insertados en la tabla products de sqlite3')
// })
