const { createSlice } = require("@reduxjs/toolkit");
import { toast } from "react-toastify";
import { createWallet } from "./walletThunk";

const initState = {
  wallets: [],
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
        state.wallets = action.payload.wallets;
      })
      .addCase(createWallet.rejected, (state) => {
        state.status = "idle";
        toast.error("Failed to create wallet");
      });
  },
});

export default walletSlice.reducer;
