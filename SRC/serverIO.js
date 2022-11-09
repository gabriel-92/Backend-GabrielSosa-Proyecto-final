import app from './app.js';
import { Server } from 'http';
import IOserver from 'socket.io';
import mongoose from 'mongoose';
import *as dotenv from 'dotenv';
import { normalize, schema, } from 'normalizr';
import cluster from 'cluster';
import os from 'os';
dotenv.config();
import log from './models/log.js';

const httpServer = Server(app);
const io = IOserver(httpServer);

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || 'FORK';

if (MODE === 'CLUSTER' && cluster.isPrimary) {
  log.info(`PID MASTER ${process.pid}`);
  const cpus = os.cpus().length;
  log.info(`FORKING FOR ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    log.info(`Worker ${worker.process.pid} died :(`);
    cluster.fork();
  });
} else {
  const server = httpServer.listen(PORT, () => {
    console.log(`Server started at address http://localhost:${PORT}/api or http://localhost:${PORT}/cart`)
    log.info(`Server started at address http://localhost:${PORT}/api or http://localhost:${PORT}/cart`);
  });
  server.on('error', (error) => console.error(`Server Error ${error}`));
  server.on('error', (err) => { log.error(err) })
}


const messagesSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  author: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
}, { collection: 'messages' });


const Message = mongoose.model('Message', messagesSchema);
const getAllMessages = async () => {
  const messages = await Message.find();
  const messagesArray = messages.map((message) => {
    return {
      id: message._id,
      timestamp: message.timestamp,
      author: {
        email: message.author.email,
        name: message.author.name,
        surname: message.author.surname,
        age: message.author.age,
        alias: message.author.alias,
        avatar: message.author.avatar,
      },
      text: message.text,
    };
  });
  const message = new schema.Entity('messages');
  const messagesList = new schema.Array(message);
  const normalizedData = normalize(messagesArray, messagesList);
  return normalizedData;
};
io.on('connection', async (socket) => {
  log.info('Nuevo cliente conectado!');
  const normalizedData = await getAllMessages();
  socket.emit('messages', normalizedData);
  socket.on('new-message', async (data) => {
    const author = {
      email: data.email,
      name: data.name,
      surname: data.surname,
      age: data.age,
      alias: data.alias,
      avatar: data.avatar,
    };
    const message = new Message({ author, text: data.text });
    await message.save();
    const normalizedData = await getAllMessages();
    io.sockets.emit('messages', normalizedData);
  });
});