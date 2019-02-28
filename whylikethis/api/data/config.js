const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hospitalfinder',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// config.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
   
//     console.log('Connected to the MySQL server.');
//   });

// Export the pool
module.exports = pool;