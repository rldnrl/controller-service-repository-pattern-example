import { Router } from "express";
import TodoController from "./controllers/TodoController";

const router = Router();
const todoController = new TodoController();

router.get("/todos", (req, res) => todoController.getAllTodos(req, res));

export default router;
