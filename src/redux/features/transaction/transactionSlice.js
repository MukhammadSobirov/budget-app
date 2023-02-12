import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from "./transactionThunks";

const initialState = {
  transactions: [],
  count: 0,
  status: "idle",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create transaction cases
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = [...state.transactions, action.payload.transaction];
        state.count = state.count + 1;
        toast.success("Transaction created successfully");
      })
      .addCase(createTransaction.rejected, (state) => {
        state.status = "failed";
        toast.error("Transaction creation failed");
      });

    // fetch transaction cases
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = action.payload.transactions;
        state.count = action.payload.count;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to fetch transactions");
      });

    // update transaction cases
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = state.transactions.map((transaction) => {
          if (transaction.id === action.payload?.transaction?.id) {
            return (transaction = action.payload.transaction);
          }
          return transaction;
        });
        toast.success("Transaction updated successfully");
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.status = "failed";
        toast.error("Transaction update failed");
      });

    // delete transaction cases
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload.id);
        state.count = state.count - 1;
        toast.success("Transaction deleted successfully");
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.status = "failed";
        toast.error("Transaction deletion failed");
      });
  },
});

export default transactionSlice.reducer;
