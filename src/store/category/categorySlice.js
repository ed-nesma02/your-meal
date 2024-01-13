import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI, POSTFIX } from "../../const/API";

const initialState = {
  category: [],
  error: "",
  activeCategory: 0,
  status: "idle",
};

export const categoryRequestAsync = createAsyncThunk("category/fetch", () => {
  return axios(`${API_URI}${POSTFIX}/category`).then(
    ({ data: category }) => category,
  );
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload.indexCategory;
      state.error = action.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryRequestAsync.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(categoryRequestAsync.fulfilled, (state, action) => {
      state.category = action.payload;
      state.status = "fulfilled";
      state.error = "";
    });
    builder.addCase(categoryRequestAsync.rejected, (state, action) => {
      state.category = [];
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
