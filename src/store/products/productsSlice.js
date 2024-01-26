import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI, POSTFIX } from "../../const/API";

const initialState = {
  products: [],
  error: "",
  status: "idle",
};

export const productsRequestAsync = createAsyncThunk(
  "products/fetch",
  (category) => {
    return axios(`${API_URI}${POSTFIX}?category=${category}`).then(
      ({ data }) => data,
    );
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productsRequestAsync.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(productsRequestAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(productsRequestAsync.rejected, (state, action) => {
        state.products = [];
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default productsSlice.reducer;
