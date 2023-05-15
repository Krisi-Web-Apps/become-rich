const fs = require("fs");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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

const encryptToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.CRYPTO_JS_SECRET).toString();
    return encryptedToken;
}

const decryptToken = (encryptedToken) => {
    const bytes  = CryptoJS.AES.decrypt(encryptedToken, process.env.CRYPTO_JS_SECRET);
    const decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedToken;
}

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN });
    return token;
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return decoded;
}

module.exports = {
    readSQLFileAsString,
    executeQuery,
    passwordHash,
    encryptToken,
    decryptToken,
    createToken,
    verifyToken,
};
