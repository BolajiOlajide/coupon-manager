const INSERT_USER = 'INSERT INTO user (name, password) VALUES (?, ?)';
const SELECT_USERS = 'SELECT * FROM user';
const SELECT_USER_BY_NAME = 'SELECT * FROM user WHERE name = ?';
const SELECT_USER_BY_ID = 'SELECT * FROM user WHERE id = ?';

module.exports = { INSERT_USER, SELECT_USERS, SELECT_USER_BY_NAME, SELECT_USER_BY_ID };