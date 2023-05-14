require("dotenv").config();
const mysql = require("mysql");

connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
});

connection.connect(function (err) {
    if (err) throw new Error(err);
    createDatabase();
});

const createDatabase = () => {
    const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`;

    connection.query(sql, (err, result) => {
        if (err) throw new Error(err);
        if (result.affectedRows > 0) {
            console.log("Database created!");
            process.exit(0);
        }
    });
}
