interface Todo {
  id: number;
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
}

export default Todo;
