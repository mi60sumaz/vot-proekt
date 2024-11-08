const express = require('express');
const mysql = require('mysql2');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // Retry every 5 seconds

// Create the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log(`Connection created: db $(db)`);

function connectWithRetry(retries = 0) {
  db.connect((err) => {
    if (err) {
      console.error(`Error connecting to MySQL: ${err.message}`);
      
      if (retries < MAX_RETRIES) {
        console.log(`Retrying connection... Attempt ${retries + 1} of ${MAX_RETRIES}`);
        setTimeout(() => connectWithRetry(retries + 1), RETRY_DELAY);
      } else {
        console.error('Max retries reached, could not connect to MySQL.');
        process.exit(1); // Exit the app if the maximum retries are reached
      }
    } else {
      console.log('Connected to MySQL');
      
      // Start the server after a successful connection
      app.use('/', routes(db));

      app.listen(80, () => {
        console.log('Server running on port 80');
      });
    }
  });
}

// Initial connection attempt
connectWithRetry();
