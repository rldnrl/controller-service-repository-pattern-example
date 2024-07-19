import { Router } from "express";
import TodoController from "./todo.controller";

const router = Router();
const todoController = new TodoController();

router.get("/todos", (req, res) => todoController.getAllTodos(req, res));
router.post("/todos", (req, res) => todoController.createTodo(req, res));
router.patch("/todos/:id", (req, res) =>
  todoController.updateTodoStatus(req, res),
);

export default router;
