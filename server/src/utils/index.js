const fs = require("fs");
const bcrypt = require("bcrypt");

const readSQLFileAsString = (filePath) => {
    return fs.readFileSync(`${filePath}.sql`).toString();
}

const executeQuery = (sql, connection) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    return promise;
}

const passwordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = {
    readSQLFileAsString,
    executeQuery,
    passwordHash,
};
