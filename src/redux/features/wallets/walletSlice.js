import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createWallet, deleteWallet, fetchWallets, updateWallet } from "./walletThunk";

const initState = {
  wallets: [],
  currentWallet: {
    id: "",
    name: "",
    balance: 0,
    currency: "",
    color: "",
    is_primary: false,
    transactions: [],
    description: "",
    created_at: "",
    updated_at: "",
  },
  count: 0,
  status: "idle",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initState,
  reducers: {
    setCurrentWallet(state, action) {
      state.currentWallet = state.wallets.find((wallet) => wallet.id === action.payload);
    },
  },
  extraReducers(builder) {
    // create wallet cases
    builder
      .addCase(createWallet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.status = "success";
        state.wallets = [...state.wallets, action.payload.wallets];
        state.count = state.count + 1;
        toast.success("Wallet created successfully");
      })
      .addCase(createWallet.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to create wallet");
      });

    // fetch wallet cases
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.status = "success";
        state.wallets = action.payload.wallets;
        state.count = action.payload.count;
        state.currentWallet = action.payload.wallets ? action.payload.wallets[0] : {};
      })
      .addCase(fetchWallets.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to fetch wallets");
      });

    // update wallet cases
    builder
      .addCase(updateWallet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        state.status = "success";
        state.wallets = state.wallets.map((wallet) => {
          if (wallet.id === action.payload.wallet.id) {
            return (wallet = action.payload.wallet);
          }
          return wallet;
        });
        toast.success("Wallet updated successfully");
      })
      .addCase(updateWallet.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to update wallet");
      });

    // delete wallet cases
    builder
      .addCase(deleteWallet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        state.status = "success";
        state.wallets = state.wallets.filter((wallet) => wallet.id !== action.payload.wallet.id);
        state.count = state.count - 1;
        toast.success("Wallet deleted successfully");
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload.message || "Failed to delete wallet");
      });
  },
});

export const { setCurrentWallet } = walletSlice.actions;
export default walletSlice.reducer;
