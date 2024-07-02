import { Request, Response } from "express";
import TodoService from "../services/TodoService";
import { isNumber } from "lodash";
import Todo from "../models/Todo";

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

    if (!id || !isNumber(id)) {
      res.status(400).json({ error: 'Invalid or missing "id" parameter' });
    }

    const statuses: Todo["status"][] = ["todo", "progress", "done"];

    if (!status || !statuses.includes(status)) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing "status" parameter' });
    }
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
