import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "todos.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export function initSchema(): void {
  const database = getDb();
  database.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = undefined!;
  }
}
