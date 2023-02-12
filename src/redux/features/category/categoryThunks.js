import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("category/fetchCategories", async (query) => {
  const response = await fetch(`/api/category?page=${query.page}&size=${query.size}`);
  return await response.json();
});

export const createCategory = createAsyncThunk("category/createCategory", async (payload) => {
  const response = await fetch(`/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const updateCategory = createAsyncThunk("category/updateCategory", async (payload) => {
  const response = await fetch("/api/category", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/category/${id}`);
    return response.date;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
