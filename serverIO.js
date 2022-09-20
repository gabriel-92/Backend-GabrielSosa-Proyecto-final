const app = require('./app.js')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const { clienteSqlIte } = require("./DB_SQLite3/SQLite3");


const PORT = process.env.PORT || 8080;


io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');
  socket.emit('messages', { messages: await clienteSqlIte.from("mensajes").select("*") });

  socket.on('new-message', async (data) => {
    messages = await clienteSqlIte.from("mensajes").select("*");
    io.sockets.emit('messages', messages = await clienteSqlIte.from("mensajes").select("*"));
  });
});



const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});


server.on('error', (error) => console.error(`Error en Servidor ${error}`));

server.on('error', (err) => {
  console.log(err);
})

