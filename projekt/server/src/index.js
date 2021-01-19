require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');

// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool } = require('pg');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS cars (
    id uuid,
    name VARCHAR(255) NOT NUll,
    description TEXT,
    available BOOLEAN DEFAULT true,
    price INTEGER NOT NULL,
    PRIMARY KEY (id)
  )
`
  )
  .catch((err) => console.log(err));

// Express route handlers
app.get('/api/test', (req, res) => {
  res.send({ message: 'Working!' });
});

// Get all to do list cars
app.get('/api/cars', async (req, res) => {
  const available = req.query.available;
  const where = available ? 'where available = true' : '';
  const cars = await pgClient.query(`SELECT * FROM cars ${where}`);
  res.status(200).send(JSON.stringify(cars.rows));
});

// Get a single todo car
app.get('/api/cars/:id', async (req, res) => {
  const id = req.params.id;

  const cars = await pgClient
    .query('SELECT * FROM cars WHERE id = $1', [id])
    .catch((e) => {
      res
        .status(500)
        .send(`Encountered an internal error when fetching car with ID ${id}`);
    });

  res.status(200).send(JSON.stringify(cars.rows[0]));
});

// Create a todo car
app.post('/api/cars', async (req, res) => {
  const { name, description, available = true, price } = req.body;
  const id = uuid();
  const cars = await pgClient
    .query(
      `INSERT INTO cars (id, name, description, available, price) VALUES 
    ($1, $2, $3, $4, $5)`,
      [id, name, description, available, price]
    )
    .catch((e) => {
      res
        .status(500)
        .send('Encountered an internal error when creating an car');
    });
  res.status(201).send(JSON.stringify({ id }));
});

// Update a todo car
app.put('/api/cars/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description, available, price } = req.body;

  const cars = await pgClient
    .query(
      `
    UPDATE cars SET name = $1, description = $2, available = $3, price = $4 WHERE id = $5
  `,
      [name, description, available, price, id]
    )
    .catch((e) => {
      res
        .status(500)
        .send('Encountered an internal error when updating an car');
    });

  res.status(200).send(JSON.stringify({ id }));
});

// Delete a todo car
app.delete('/api/cars/:id', async (req, res) => {
  const id = req.params.id;

  await pgClient.query('DELETE FROM cars WHERE id = $1', [id]).catch((e) => {
    res.status(500).send('Encountered an internal error when deleting an car');
  });

  res.status(200).send({ id });
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
