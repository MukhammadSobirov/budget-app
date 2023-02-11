import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "./categoryThunks";

const initState = {
  categories: [],
  count: 0,
  status: "idle",
};

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    // create category cases
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = [...state.categories, action.payload.category];
        state.count = state.count + 1;
        toast.success("Category created successfully");
      })
      .addCase(createCategory.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to create category");
      });

    // fetch category cases
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.categories;
        state.count = action.payload.count;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to fetch categories");
      });

    // update category cases
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.category.id) {
            return (category = action.payload.category);
          }
          return category;
        });
        toast.success("Category updated successfully");
      })
      .addCase(updateCategory.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to update category");
      });

    // delete category cases
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = state.categories.filter((category) => category.id !== action.payload.id);
        state.count = state.count - 1;
        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status = "failed";
        toast.error("Failed to delete category");
      });
  },
});

export default categorySlice.reducer;
