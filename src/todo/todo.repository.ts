import sqlite3 from "sqlite3";
import { Todo } from "./todo.model";

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

  async createTodo(todoData: Omit<Todo, "id">): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const { title, description, status } = todoData;
      const sql =
        "INSERT INTO todos (title, description, status) VALUES (?, ?, ?)";
      this.db.run(sql, [title, description, status], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, title, description, status });
        }
      });
    });
  }

  async updateTodoStatus(id: number, status: Todo["status"]): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE todos SET status = ? WHERE id = ?";
      this.db.run(sql, [status, id], function (err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error(`Todo with id ${id} not found`));
          } else {
            resolve({ id, status } as Todo);
          }
        }
      });
    });
  }

  beginTransaction(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  commitTransaction(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("COMMIT", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  rollbackTransaction(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("ROLLBACK", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default TodoRepository;
