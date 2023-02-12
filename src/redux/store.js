const { configureStore } = require("@reduxjs/toolkit");
import categorySlice from "./features/category/categorySlice";
import transactionSlice from "./features/transaction/transactionSlice";
import walletSlice from "./features/wallets/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    category: categorySlice,
    transaction: transactionSlice,
  },
});

export default store;
