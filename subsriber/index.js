import express from 'express';
import redis from 'redis';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
const app = express();
app.use(cors());
let products = [];
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.emit('products', JSON.stringify(products));
  socket.on('disconnect', (socket) => {
    console.log(`User disconnected  ${socket.id}`);
  });
});

const subscriber = redis.createClient({
  host: '127.0.0.1',
  no_ready_check: true,
  auth_pass: '123456',
});
await subscriber.connect();

await subscriber.subscribe('products', (message) => {
  const msg = JSON.parse(message);
  if (msg.priority > 7) {
    products.push(JSON.parse(message));
    io.emit('products', JSON.stringify(products));
  }
});
const port = process.env.PORT || 8081;
app.get('/', (req, res) => {
  res.status(200).json({ msg: `Redis Subscriber active at ${port}` });
});
app.get('/subscribe', (req, res) => {
  res.status(200).json(products);
});

server.listen(port, () => console.log(`App running on ${port}`));
