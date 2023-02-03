const { createSlice } = require("@reduxjs/toolkit");
import { toast } from "react-toastify";
import { createWallet, fetchWallets } from "./walletThunk";

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
  },
});

export default walletSlice.reducer;
