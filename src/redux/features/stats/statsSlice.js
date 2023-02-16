import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchStats = createAsyncThunk("stats/fetchStats", async () => {
  const response = await fetch("/api/wallet/stats");
  const data = await response.json();
  return data;
});

const initialState = {
  stats: [],
  status: "idle",
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = "success";
        state.stats = action.payload.stats;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = "fail";
        toast.error(action?.error?.message || "Something went wrong");
      });
  },
});

export const selectAllStats = (state) => state.stats;
export default statsSlice.reducer;
