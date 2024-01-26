import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";
import productsReducer from "./products/productsSlice.js";
import orderReducer, { localStorageMiddleware } from "./order/orderSlice.js";
import modalReducer from "./modalDelivery/modalDeliverySlice.js";
import formReducer from "./form/formSlice.js";
import modalInfoReducer from "./modalInfo/modalInfoSlice";
import productReducer from "./product/productSlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productsReducer,
    product: productReducer,
    order: orderReducer,
    modal: modalReducer,
    form: formReducer,
    modalInfo: modalInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
