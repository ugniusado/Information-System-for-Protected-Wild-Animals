const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'speciesDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

app.get('/species', (req, res) => {
  const sql = 'SELECT * FROM species';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/species/:name', (req, res) => {
  const name = req.params.name;
  db.query('SELECT * FROM species WHERE scientific_name = ?', [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Server error'});
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({message: 'Species not found'});
    }
  });
});

app.listen(4000, () => console.log('Server started on port 4000.'));
