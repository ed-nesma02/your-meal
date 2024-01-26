import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI, POSTFIX } from "../../const/API";

const initialState = {
  product: {},
  error: "",
  status: "idle",
};

export const productRequestAsync = createAsyncThunk(
  "product/fetch",
  ({ id }) => {
    return axios(`${API_URI}${POSTFIX}/${id}`).then(({ data }) => data);
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productRequestAsync.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(productRequestAsync.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(productRequestAsync.rejected, (state, action) => {
        state.product = {};
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default productSlice.reducer;
