import TodoRepository from "./todo.repository";
import { Todo } from "./todo.model";

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

  async updateTodoStatus(todoId: number, status: Todo["status"]) {
    return this.todoRepository.updateTodoStatus(todoId, status);
  }
}

export default TodoService;
