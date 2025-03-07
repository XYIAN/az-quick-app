export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
}