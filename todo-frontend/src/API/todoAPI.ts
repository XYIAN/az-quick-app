import axios from "axios";

const API_URL = "http://localhost:5001/api/todos"; // Adjust if needed

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (todo: {
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
  completed: boolean;
}) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (
  id: string,
  updatedTodo: {
    title: string;
    description?: string;
    dueDate?: string;
    category?: string;
    completed: boolean;
  },
) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
