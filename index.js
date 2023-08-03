const express = require('express');
const app = express();
const path = require('path');
const { spawn } = require('child_process');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/predict', (req, res) => {
  const data = req.body;

  const pythonProcess = spawn('python', ['python_scripts/model_train.py', JSON.stringify(data)]);

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  });

  pythonProcess.on('close', (code) => {
    try {
      const prediction = JSON.parse(result).prediction;
      const message = prediction === 1 ? 'The water is potable.' : 'The water is not potable.';
      res.json({ prediction, message });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
