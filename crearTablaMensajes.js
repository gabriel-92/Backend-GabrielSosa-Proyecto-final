// crear la tabla de mensajes para la base de datos sqlite3 con knex y node.js
const { clienteSqlIte } = require("./DB_SQLite3/SQLite3");


const crearTablaMensajes = async () => {
  const existe = await clienteSqlIte.schema.hasTable("mensajes");
  if (!existe) {
    await clienteSqlIte.schema.createTable("mensajes", (tabla) => {
      tabla.increments("id"),
        tabla.string("author"),
        tabla.string("date"),
        tabla.string("text");
    });
    console.log("tabla mensajes creada");
  } else {
    console.log("tabla mensajes ya existe");
  }
};



module.exports = { crearTablaMensajes };