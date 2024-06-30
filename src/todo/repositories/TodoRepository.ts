import sqlite3 from "sqlite3";
import Todo from "../models/Todo";

class TodoRepository {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("/app/data/database.db", (err) => {
      if (err) {
        console.log("Error Occurred - " + err.message);
      } else {
        console.log("Database Connected");
        this.createTable();
      }
    });
  }

  private createTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                status TEXT
            )
        `;
    this.db.run(sql, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table created or already exists");
      }
    });
  }

  async getAllTodos(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      this.db.all<Todo>("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default TodoRepository;
