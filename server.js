const express = require('express');
const db = require('./db');
const cache = require('./cache');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', routes);

db.connect().then(() => {
  console.log('Connected to PostgreSQL');
}).catch((err) => {
  console.error('Error connecting to PostgreSQL', err);
});

cache.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Error connecting to Redis', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
