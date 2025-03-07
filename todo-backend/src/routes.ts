import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./todoController";
import { getCategories, createCategory } from "./categoryController";

const router = Router();

// Todo Routes
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

// Category Routes
router.get("/categories", getCategories);
router.post("/categories", createCategory);

export default router;