import express from 'express';
import redis from 'redis';
import randomWords from 'random-words';
const app = express();

const publisher = redis.createClient({
  host: '127.0.0.1',
  no_ready_check: true,
  auth_pass: '123456',
});
await publisher.connect();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).json({ msg: `Redist Publisher active at ${port}` });
});

async function publish() {
  for (let i = 0; i < 20; i++) {
    const message = {
      priority: Math.floor(Math.random() * 10) + 1,
      time_stamp: Date.now(),
      name: randomWords(5).join(' '),
    };
    await publisher.publish('products', JSON.stringify(message));
  }
}

setInterval(() => {
  publish();
}, 1000);

app.get('/publish', async (req, res) => {
  const message = {
    priority: Math.floor(Math.random() * 10) + 1,
    time_stamp: Date.now(),
    name: 'hello bro!',
  };
  await publisher.publish('products', JSON.stringify(message));
  res.send('Product published successfully!');
});

app.listen(port, () => console.log(`App running on ${port}`));
