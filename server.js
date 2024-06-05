const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route to handle incoming data
app.post('/data', (req, res) => {
  const { value } = req.body;
  console.log('Received value:', value);
  res.send(`Received value: ${value}`);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
