// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create a new Express application
const app = express();

// Use built-in middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a connection to your MySQL database
// Be sure to replace 'database_name', 'user_name', 'password' with your actual details
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user_name',
    password: 'password',
    database: 'database_name'
});

// Connect to the database
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Set up a POST route at the "/spotted" endpoint
app.post('/spotted', function (req, res) {
    // This is where you handle the form submission
    // You would take the data from the form (which is in req.body)
    // and insert it into your database

    let sql = 'INSERT INTO spotted_animals SET ?'; // 'spotted_animals' should be your actual table name
    let query = db.query(sql, req.body, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('Form submitted successfully');
    });
});

// Start the server
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
