import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async (query) => {
  const response = await fetch(`/api/transaction?page=${query.page}&size=${query.size}`);
  return await response.json();
});

export const createTransaction = createAsyncThunk("transaction/createTransaction", async (payload) => {
  const response = await fetch(`/api/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const updateTransaction = createAsyncThunk("transaction/updateTransaction", async (payload) => {
  const response = await fetch("/api/transaction", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const deleteTransaction = createAsyncThunk("transaction/deleteTransaction", async (id) => {
  const response = await fetch(`/api/transaction/${id}`, {
    method: "DELETE",
  });
  return await response.json();
});
