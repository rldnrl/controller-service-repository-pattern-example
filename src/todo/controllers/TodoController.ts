import { Request, Response } from "express";
import TodoService from "../services/TodoService";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await this.todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const newTodo = await this.todoService.createTodo(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async updateTodoStatus(req: Request, res: Response) {
    const { id, status } = req.body;
    try {
      const updatedTodo = await this.todoService.updateTodoStatus(id, status);
      res.json(updatedTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}

export default TodoController;
