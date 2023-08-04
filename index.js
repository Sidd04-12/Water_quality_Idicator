const express = require('express');
const app = express();
const path = require('path');
const { spawn } = require('child_process');
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/w_q_c', (req, res) => {
  res.render('w_q_c');
});


app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/result', (req, res) => {
  const prediction = req.query.prediction;
  const message = prediction === '1' ? 'The water is potable.' : 'The water is not potable.';
  res.render('result', { message });
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
      res.json({ prediction }); // Send the prediction as JSON
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
  });
});


app.get('/data_set', (req, res) => {
  const csvFilePath = 'data/water_potability2.csv';

  // Read the CSV file using fs.readFileSync
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Pass the CSV data to the EJS template
  res.render('dataset', { csvData });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});