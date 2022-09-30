
import { clienteSql } from '../config/db.js'

// clienteSql.schema.hasTable('products')
//     .then(exists => {
//         if (!exists) {
//             clienteSql.schema.createTable('products', tabla => {
//                 tabla.increments('id'),
//                     tabla.string('title'),
//                     tabla.string('image'),
//                     tabla.string('price'),
//                     tabla.string('description'),
//                     tabla.string('category'),
//                     tabla.string('stock')
//             })
//                 .then(() => {
//                     console.log("table 'products' created")
//                 })
//         } else {
//             console.log("table 'products' already exists")
//         }
//     })
//     .finally(() => {
//         clienteSql.destroy()
//     })

//ingresar productos a la tabla
// const productos = [
//   {
//     "title": "Opna Women's Short Sleeve Moisture",
//     "price": 7.95,
//     "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Mens Casual Premium Slim Fit T-Shirts ",
//     "price": 22.3,
//     "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     "stock": 25

//   },
//   {
//     "title": "Mens Cotton Jacket",
//     "price": 55.99,
//     "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Mens Casual Slim Fit",
//     "price": 15.99,
//     "description": "The color could be slightly different between on the screen and in practice",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//     "price": 695,
//     "description": "From our Legends Collection, the Naga was inspired by the mythical",
//     "category": "jewelery",
//     "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Solid Gold Petite Micropave ",
//     "price": 168,
//     "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
//     "category": "jewelery",
//     "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "White Gold Plated Princess",
//     "price": 9.99,
//     "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
//     "category": "jewelery",
//     "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
//     "price": 10.99,
//     "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
//     "category": "jewelery",
//     "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//     "price": 64,
//     "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
//     "price": 109,
//     "description": "Easy upgrade for faster boot up, shutdown, application load and response",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
//     "price": 109,
//     "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
//     "price": 114,
//     "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
//     "price": 599,
//     "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology.",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Samsung 49-Inch  144Hz Curved Gaming Monitor – Super Ultrawide Screen QLED ",
//     "price": 999.99,
//     "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen",
//     "category": "electronics",
//     "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
//     "price": 56.99,
//     "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
//     "price": 29.95,
//     "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER)",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
//     "price": 39.99,
//     "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
//     "stock": 25
//   },
//   {
//     "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
//     "price": 9.85,
//     "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach,",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
//     "stock": 25
//   },
//   {
//     "title": "Opna Women's Short Sleeve Moisture",
//     "price": 7.95,
//     "description": "100% Polyester, Machine wash, 100% cationic polyester interlock,",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
//     "stock": 25
//   },

// ]
// //scrip para guardar todo el Json de 1 vez
// productos.forEach(producto => {
//   clienteSql('products').insert(producto)
//     .then(() => {
//       console.log("product saved")
//     })
//     .catch(error => {
//       console.log(error)
//     })
//     .finally(() => {
//       clienteSql.destroy()
//     })
// })


// //un console.log para consultar la tabla
// clienteSql('products').select('*')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch(error => {
//     console.log(error)
//   })
//   .finally(() => {
//     clienteSql.destroy()
//   })

//     //consultar productos de la tabla
// clienteSql('products').select()
//     .then((results) => {
//         console.log(results)
//     })
//     .catch(error => {
//         console.log(error)
//     })
//     .finally(() => {
//         clienteSql.destroy()
//     })

//crear tabla de cart 
clienteSql.schema.createTable('cart', (table) => {
  table.increments('id')
  table.integer('id_product')
  table.integer('timestamp')
  // table.integer('quantity')
  //table.integer('total')
  // table.integer('id_user')
})
  .then(() => {
    console.log("table created")
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    clienteSql.destroy()
  })