export interface ToDo {
  text: string;
  working: boolean;
  completed: boolean;
}

export type ToDoList = Record<string, ToDo>;
