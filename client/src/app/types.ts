export interface ITodoWithoutId {
  text: string;
  isCompleted: boolean;
}

export interface ITodo extends ITodoWithoutId {
  id: number;
}

export interface  IResCreatedTodo extends ITodo{
  created_at: string;
  updated_at: string;
  project_id: number;
}

export interface IProject {
  id: number;
  title: string;
  todos: ITodo[];
}
