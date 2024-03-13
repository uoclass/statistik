const db_keys = require('./server_keys.js');
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: db_keys.DB_HOST,
    user: db_keys.DB_USER,
    password: db_keys.DB_PASSWORD,
    database: db_keys.DB_NAME
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Database connected.");
});

