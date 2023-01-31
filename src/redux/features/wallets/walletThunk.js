import { createAsyncThunk } from "@reduxjs/toolkit";

export const createWallet = createAsyncThunk("wallet/createWallet", async (payload) => {
  const response = await fetch("/api/wallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});
