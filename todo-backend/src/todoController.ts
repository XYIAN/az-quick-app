import { Request, Response } from "express";
import { z } from "zod";
import { Todo } from "./models";

// In-memory database
let todos: Todo[] = [];

// Schema validation
const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  category: z.string().optional(),
  completed: z.boolean().default(false),
});

// Get all todos
export const getTodos = (req: Request, res: Response): void => {
  res.json(todos);
};

// Create a new todo
export const createTodo = (req: Request, res: Response): void => {
  const result = todoSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
    return;
  }

  const newTodo: Todo = { id: Date.now().toString(), ...result.data };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// Update a todo
export const updateTodo = (req: Request, res: Response): void => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
};

// Delete a todo
export const deleteTodo = (req: Request, res: Response): void => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Todo deleted" });
};
