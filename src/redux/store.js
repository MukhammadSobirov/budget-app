const { configureStore } = require("@reduxjs/toolkit");
import walletSlice from "./features/wallets/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
  },
});

export default store;
