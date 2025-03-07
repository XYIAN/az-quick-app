import { Request, Response } from "express";
import { Category } from "./models";

let categories: Category[] = [];

// Get all categories
export const getCategories = (req: Request, res: Response): void => {
  res.json(categories);
};

// Create a new category
export const createCategory = (req: Request, res: Response): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Category name is required" });
    return;
  }

  const newCategory: Category = { id: Date.now().toString(), name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
};