const connection = require("../config/database");
const { executeQuery } = require("../utils");

const post = {
  insert(title, options) {
    const sql = `INSERT INTO questions (title, options) VALUES ('${title}', '${options}');`;
    const result = executeQuery(sql, connection);
    return result;
  },
  update(id, title, options) {
    const sql = `UPDATE questions SET title='${title}', options='${options}' WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  }
}

const get = {
  byId(id) {
    const sql = `SELECT * FROM questions WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  }
}

module.exports = {
  post,
  get,
}