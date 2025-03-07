import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/todos";

interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

// Async Thunks for API Calls
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get<Todo[]>(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Omit<Todo, "id">) => {
  const response = await axios.post<Todo>(API_URL, todo);
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo: Todo) => {
  const response = await axios.put<Todo>(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;