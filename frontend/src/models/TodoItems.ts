interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoItems {
  todos: Todo[];
}
