const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');

// Set up your database connection
let con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '12345678',
  database: "mydb"
});

const app = express();

// Use body-parser middleware to parse incoming json
app.use(bodyParser.json());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/spotted', upload.single('file'), (req, res) => {
  // Get the values from the request body
  let name = req.body.name;
  let surname = req.body.surname;
  let description = req.body.description;
  let file = req.file ? req.file.filename : null;
  let lat = req.body.lat;
  let lng = req.body.lng;

  // Prepare the data for the SQL query
  let values = [name, surname, description, file, lat, lng];

  // Construct the SQL query
  let sql = 'INSERT INTO spottings (name, surname, description, file, lat, lng) VALUES (?, ?, ?, ?, ?, ?)';

  // Execute the SQL query
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('There was an error inserting the data:', err);
      res.status(500).send('Error inserting data');
      return;
    }

    console.log('Data inserted successfully');
    res.send('Data received');
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
