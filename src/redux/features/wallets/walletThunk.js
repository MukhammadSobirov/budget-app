import { createAsyncThunk } from "@reduxjs/toolkit";

export const createWallet = createAsyncThunk("wallet/createWallet", async (payload) => {
  const response = await fetch("/api/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const fetchWallets = createAsyncThunk("wallet/fetchWallets", async () => {
  const response = await fetch("/api/wallet");
  return await response.json();
});

export const updateWallet = createAsyncThunk("wallet/updateWallet", async (payload) => {
  const response = await fetch("/api/wallet", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const deleteWallet = createAsyncThunk("wallet/deleteWallet", async (id) => {
  const response = await fetch(`/api/wallet/${id}`, {
    method: "DELETE",
  });
  return await response.json();
});
