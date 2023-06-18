const sqlite3 = require("sqlite3").verbose()

module.exports = {
  insert,
}

function insert(ticket, name) {
  const db = new sqlite3.Database("./mogiri.db")
  db.serialize(function () {
    db.run(
      "CREATE TABLE IF NOT EXISTS mogiri_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, ticket TEXT, name TEXT, created_at TEXT)"
    )
    const stmt = db.prepare(
      "INSERT INTO mogiri_logs(ticket, name, created_at) VALUES (?, ?, datetime('now', '+9 hours'))"
    )
    stmt.run(ticket, name)
    stmt.finalize()
  })
  db.close()
}
