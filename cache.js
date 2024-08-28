const redis = require('redis');

const client = redis.createClient({
  url: 'redis://localhost:6379'
});

const connect = async () => {
  await client.connect();
};

const get = async (key) => {
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
};

const set = async (key, value) => {
  await client.set(key, JSON.stringify(value));
};

module.exports = { connect, get, set };
