const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./db/coupon_manager.db', sqlite.OPEN_READWRITE, err => {
    if (err) {
        console.error(err.message);
    } else {
        db.exec('PRAGMA foreign_keys = ON;', err => err ? console.error('FK Pragma statement didn\'t work.') : console.log('Foreign Key Enforcement is on.'));
        console.log('Connected to DB');
    }
});

const close = () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve('Closed DB connection')));
const run = (sql, params = []) => new Promise((resolve, reject) => db.run(sql, params, err => err ? reject(err) : resolve()));
const get = (sql, params = []) => new Promise((resolve, reject) => db.get(sql, params, (err, result) => err ? reject(err) : resolve(result)));
const all = (sql, params = []) => new Promise((resolve, reject) => db.all(sql, params, (err, result) => err ? reject(err) : resolve(result)));

module.exports = { run, close, get, all };