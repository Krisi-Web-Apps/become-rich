const connection = require("../config/database");
const { executeQuery } = require("../utils");

const post = {
  insert(email, password, username, gender, options) {
    const sql = `INSERT INTO users (email, password, username, gender, options) VALUES ('${email}', '${password}', '${username}', '${gender}', '${options}');`;
    const result = executeQuery(sql, connection);
    return result;
  }
}

const get = {
  byEmail(email) {
    const sql = `SELECT * FROM users WHERE email = '${email}';`;
    const result = executeQuery(sql, connection);
    return result;
  },
  passwordById(id) {
    const sql = `SELECT password FROM users WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  },
  roleAsById(id) {
    const sql = `SELECT role_as FROM users WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  }
}

module.exports = {
  post,
  get,
}