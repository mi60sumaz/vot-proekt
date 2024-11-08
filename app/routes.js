const express = require('express');
const bcrypt = require('bcrypt');

module.exports = (db) => {
  const router = express.Router();

  router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username already exists' });
          }
          throw err;
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (err) {
      res.status(500).json({ message: 'Error signing up' });
    }
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      res.json({ message: 'Login successful', userId: user.id });
    });
  });

  router.post('/addorders', (req, res) => {
    const { userId, order_details } = req.body;
    const query = 'INSERT INTO orders (user_id, order_details) VALUES (?, ?)';
    db.query(query, [userId, JSON.stringify(order_details)], (err) => {
      if (err) throw err;
      res.json({ message: 'Order added successfully' });
    });
  });

  router.get('/getorders', (req, res) => {
    const { userId } = req.query;
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  return router;
};
