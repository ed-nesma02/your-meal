import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const/API";
import axios from "axios";
import { calcTotal } from "../../utils/calcTotal";

const initialState = {
  orderList: JSON.parse(localStorage.getItem("order") || "[]"),
  orderGoods: [],
  totalPrice: 0,
  totalCount: 0,
  status: "idle",
  error: "",
};

export const localStorageMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);

  if (nextAction.type.startsWith("order/")) {
    const orderList = store.getState().order.orderList;
    localStorage.setItem("order", JSON.stringify(orderList));
  }
  return nextAction;
};

export const orderRequestAsync = createAsyncThunk(
  "ordrer/orderRequestAsync",
  (_, { getState }) => {
    const listId = getState().order.orderList.map((item) => item.id);

    return axios(`${API_URI}${POSTFIX}?list=${listId}`).then(
      ({ data }) => data,
    );
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id,
      );
      if (productOrderList) {
        productOrderList.count += 1;
        console.log(productOrderList.count);
        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id,
        );

        productOrderGoods.count = productOrderList.count;
        [state.totalCount, state.totalPrice] = calcTotal(state.orderGoods);
      } else {
        state.orderList.push({ ...action.payload, count: 1 });
      }
    },
    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id,
      );

      if (productOrderList.count > 1) {
        productOrderList.count -= 1;

        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id,
        );

        productOrderGoods.count = productOrderList.count;
        [state.totalCount, state.totalPrice] = calcTotal(state.orderGoods);
      } else {
        state.orderList = state.orderList.filter(
          (item) => item.id !== action.payload.id,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderRequestAsync.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(orderRequestAsync.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map((item) => {
          const product = action.payload.find(
            (product) => product.id === item.id,
          );

          product.count = item.count;
          return product;
        });

        state.status = "fulfilled";
        state.orderGoods = orderGoods;
        [state.totalCount, state.totalPrice] = calcTotal(orderGoods);
        state.error = "";
      })
      .addCase(orderRequestAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export const { addProduct, removeProduct } = orderSlice.actions;
export default orderSlice.reducer;
