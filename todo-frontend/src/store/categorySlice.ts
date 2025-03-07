import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/categories";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

// Async Thunks
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await axios.get<Category[]>(API_URL);
  return response.data;
});

export const addCategory = createAsyncThunk("categories/addCategory", async (name: string) => {
  const response = await axios.post<Category>(API_URL, { name });
  return response.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
