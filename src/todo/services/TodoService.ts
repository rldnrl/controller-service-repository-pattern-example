import TodoRepository from "../repositories/TodoRepository";
import Todo from "../models/Todo";

class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async getAllTodos() {
    return this.todoRepository.getAllTodos();
  }

  async createTodo(todoData: Omit<Todo, "id">) {
    return this.todoRepository.createTodo({
      ...todoData,
      status: "todo",
    });
  }
}

export default TodoService;
