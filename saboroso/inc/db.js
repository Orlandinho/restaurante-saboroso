const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user:"antonio",
    database:"saboroso",
    password: "!Nb8UF978TP8"
});

module.exports = conn;