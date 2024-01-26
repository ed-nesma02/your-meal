import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI } from "../../const/API";
import { clearOrder } from "../order/orderSlice";

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
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Не удалось оформить заказ");
      }
      dispatch(clearOrder());
      return response.json();
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
    resetForm: (state) => {
      state.name = "";
      state.phone = "";
      state.format = "delivery";
      state.address = "";
      state.floor = "";
      state.intercom = "";
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

export const { updateValue, resetForm } = formSlice.actions;
export default formSlice.reducer;
