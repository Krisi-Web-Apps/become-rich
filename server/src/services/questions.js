const connection = require("../config/database");
const { executeQuery } = require("../utils");

const post = {
  insert(title, options) {
    const sql = `INSERT INTO questions (title, options) VALUES ('${title}', '${options}');`;
    const result = executeQuery(sql, connection);
    return result;
  },
  update(id, title, options, category) {
    const sql = `UPDATE questions SET title='${title}', options='${options}', category='${category}' WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  }
}

const get = {
  byId(id) {
    const sql = `SELECT * FROM questions WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  },
  random(limit = 15) {
    const sql = `SELECT * FROM questions ORDER BY RAND() LIMIT ${limit};`;
    const result = executeQuery(sql, connection);
    return result;
  },
  allByLimit(limit = 20, offset = 0) {
    const sql = `SELECT * FROM questions ORDER BY id LIMIT ${limit} OFFSET ${offset};`;
    const result = executeQuery(sql, connection);
    return result;
  },
  all() {
    const sql = `SELECT * FROM questions ORDER BY id;`;
    const result = executeQuery(sql, connection);
    return result;
  },
  search(by, term, limit = 10, offset = 0) {
    const sql = `SELECT * FROM questions WHERE ${by} LIKE '${term}%' LIMIT ${limit} OFFSET ${offset};`;
    const result = executeQuery(sql, connection);
    return result;
  },
}

const del = {
  byId(id) {
    const sql = `DELETE FROM questions WHERE id = ${id};`;
    const result = executeQuery(sql, connection);
    return result;
  },
  all() {
    const sql = `DELETE FROM questions;`;
    const result = executeQuery(sql, connection);
    return result;
  },
}

module.exports = {
  post,
  get,
  del,
}
