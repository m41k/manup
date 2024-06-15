const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/updates.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS updates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, version TEXT NOT NULL, status TEXT NOT NULL)");
    db.run("CREATE TABLE IF NOT EXISTS schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT NOT NULL, action TEXT NOT NULL)");
});

module.exports = db;
