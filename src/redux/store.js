import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import statsSlice from "./features/stats/statsSlice";
import transactionSlice from "./features/transaction/transactionSlice";
import walletSlice from "./features/wallets/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    category: categorySlice,
    transaction: transactionSlice,
    stats: statsSlice,
  },
});

export default store;
