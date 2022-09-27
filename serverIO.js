const app = require('./app.js')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const { clienteSqlIte } = require("./configDB.js");
import *as dotenv from 'dotenv';





const PORT = dotenv.config().parsed.PORT || 8080;

io.on('connection', async socket => {
  console.log('New client connected!');
  socket.emit('messages', { messages: await clienteSqlIte.from("mensajes").select("*") });

  socket.on('new-message', async (data) => {
    const { author, text } = data;
    const date = new Date().toLocaleString();
    const newMessage = { author, text, date };
    await clienteSqlIte.from("mensajes").insert(newMessage);
    io.sockets.emit('messages', { messages: await clienteSqlIte.from("mensajes").select("*") });
  })
})



const server = httpServer.listen(PORT, () => {
  console.log(`Server started at address http://localhost:${PORT}/api or http://localhost:${PORT}/cart`);
});


server.on('error', (error) => console.error(`Server Error ${error}`));

server.on('error', (err) => {
  console.log(err);
})

