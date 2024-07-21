import TodoRepository from "./todo.repository";
import { Todo } from "./todo.model";
import TransactionManager from "../common/transaction-manager";

class TodoService {
  private todoRepository: TodoRepository;
  private transactionManager: TransactionManager;

  constructor() {
    this.todoRepository = new TodoRepository();
    this.transactionManager = new TransactionManager(
      this.todoRepository.getDb()
    );
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
    await this.transactionManager.beginTransaction();
    try {
      for (const { id, status } of updates) {
        await this.todoRepository.updateTodoStatus(id, status);
      }
      await this.transactionManager.commitTransaction();
    } catch (error) {
      await this.transactionManager.rollbackTransaction();
      throw error;
    }
  }
}

export default TodoService;
