const dotenv = require('dotenv');
const express = require('express');
const redis = require('redis');
const app = express();

dotenv.config();

const port = process.env.SERVER_PORT;


// Initialize Redis Client with explicit host and port
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Middleware to parse JSON bodies
app.use(express.json());

// Log Redis connection errors
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Connect to Redis asynchronously
async function connectRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis');

    await client.set('todoList', JSON.stringify([]));
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
}

// Call the function to connect to Redis
connectRedis();

// Load Route: GET /load - Retrieves the TODO list from Redis
app.get('/load', async (req, res) => {
  console.log('Load route hit');

  try {
    const data = await client.get('todoList');
    const todoList = JSON.parse(data);

    console.log('Retrieved data from Redis:', todoList);

    res.json(todoList);
  } catch (err) {
    console.error('Error retrieving data from Redis:', err);

    res.status(500).send('Error retrieving data');
  }
});

// Save Route: POST /save - Save the TODO list to Redis
app.post('/save', async (req, res) => {
  console.log('Save route hit');

  const { todoList } = req.body;

  try {
    await client.set('todoList', JSON.stringify(todoList));

    res.json({ status: 'save successful' });
  } catch (err) {
    console.error('Error saving data to Redis:', err);

    res.status(500).send('Error saving data');
  }
});

// Clear Route: GET /clear - Clears the TODO list in Redis
app.get('/clear', async (req, res) => {
  console.log('Clear route hit');

  try {
    await client.set('todoList', JSON.stringify([]));

    res.json({ status: 'clear successful' });
  } catch (err) {
    console.error('Error clearing data in Redis:', err);

    res.status(500).send('Error clearing data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
