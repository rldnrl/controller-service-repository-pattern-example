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

  async updateMultipleTodoStatuses(
    updates: { id: number; status: Todo["status"] }[]
  ) {
    await this.todoRepository.beginTransaction();
    try {
      for (const { id, status } of updates) {
        await this.todoRepository.updateTodoStatus(id, status);
      }
      await this.todoRepository.commitTransaction();
    } catch (error) {
      await this.todoRepository.rollbackTransaction();
      throw error;
    }
  }
}

export default TodoService;
