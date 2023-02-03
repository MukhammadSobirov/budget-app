const { createSlice } = require("@reduxjs/toolkit");
import { toast } from "react-toastify";
import { createWallet, fetchWallets, updateWallet } from "./walletThunk";

const initState = {
  wallets: [],
  count: 0,
  status: "idle",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    // create wallet cases
    builder
      .addCase(createWallet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.status = "idle";
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
        state.status = "idle";
        state.wallets = action.payload.wallets;
        state.count = action.payload.count;
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
        state.status = "idle";
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
  },
});

export default walletSlice.reducer;
