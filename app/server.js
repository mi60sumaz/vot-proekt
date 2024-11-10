const express = require('express');
const mysql = require('mysql2');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error(`Error connecting to MySQL: ${err.message}`);
    process.exit(1);
  } else {
    console.log('Connected to MySQL');

    app.use('/', routes(db));

    app.listen(80, () => {
      console.log('Server running on port 80');
    });
  }
});
