const { configureStore } = require("@reduxjs/toolkit");
import categorySlice from "./features/category/categorySlice";
import walletSlice from "./features/wallets/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    category: categorySlice,
  },
});

export default store;
