import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI } from "../../const/API";

const initialState = {
  name: "",
  phone: "",
  format: "delivery",
  address: "",
  floor: "",
  intercom: "",
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (data, { rejectWithValue }) => {
    try {
      await fetch(`${API_URI}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.response = "";
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error;
      }),
});

export const { updateValue } = formSlice.actions;
export default formSlice.reducer;
