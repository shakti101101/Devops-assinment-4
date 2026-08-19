const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label>Item Name:</label>
      <input type="text" name="itemName" required><br>
      <label>Item Description:</label>
      <textarea name="itemDescription" required></textarea><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Forward form data to Flask backend
const axios = require('axios');
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('http://backend:5000/submit_todo_item', req.body);
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(port, () => console.log(`Frontend running on port ${port}`));
