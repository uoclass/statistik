const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "uoclassrooms",
    password: "Pin3Appl3P3n?",
    database: "database"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected.")
    conn.query("CREATE DATABASE tickets", function (err, result) {
        if (err) throw err;
        console.log("Database initialized.");
    });
});