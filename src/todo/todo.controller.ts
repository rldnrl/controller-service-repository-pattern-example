import { Request, Response } from "express";
import TodoService from "./todo.service";
import { isArray, isNumber, isString } from "lodash";
import { Todo } from "./todo.model";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await this.todoService.getAllTodos();
      return res.json(todos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async createTodo(req: Request, res: Response) {
    const { title, description } = req.body;

    if (!title || !isString(title)) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing "title" parameter' });
    }

    if (!description || isString(description)) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing "description" parameter' });
    }

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
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !isNumber(+id)) {
      res.status(400).json({ error: 'Invalid or missing "id" parameter' });
    }

    const statuses: Todo["status"][] = ["todo", "progress", "done"];

    if (!status || !statuses.includes(status)) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing "status" parameter' });
    }
    try {
      const updatedTodo = await this.todoService.updateTodoStatus(+id, status);
      res.json(updatedTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async updateMultipleTodoStatuses(req: Request, res: Response) {
    const updates = req.body;

    if (
      !isArray(updates) ||
      updates.some(
        (update) =>
          !update.id || !["todo", "progress", "done"].includes(update.status)
      )
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      await this.todoService.updateMultipleTodoStatuses(updates);
      res.status(200).json({ message: "Todos updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default TodoController;
