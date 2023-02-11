import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const response = await fetch("/api/category");
  return await response.json();
});

export const createCategory = createAsyncThunk("category/createCategory", async (payload) => {
  const response = await fetch("/api/category", {
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

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
  const response = await fetch(`/api/category/${id}`, {
    method: "DELETE",
  });
  return await response.json();
});
