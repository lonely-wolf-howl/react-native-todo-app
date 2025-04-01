export interface ToDo {
  text: string;
  working: boolean;
}

export type ToDoList = Record<string, ToDo>;
