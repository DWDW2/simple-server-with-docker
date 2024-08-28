const express = require('express');
const db = require('./db');
const cache = require('./cache');

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;
  
  const cachedUser = await cache.get(cacheKey);
  if (cachedUser) {
    return res.json(cachedUser);
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await cache.set(cacheKey, result[0]);

    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching user from database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/user', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
