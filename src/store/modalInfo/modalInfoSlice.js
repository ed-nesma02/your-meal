import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  id: "",
  count: 1,
};

const modalInfoSlice = createSlice({
  name: "modalInfo",
  initialState,
  reducers: {
    openModalInfo: (state, action) => {
      state.isOpen = true;
      state.id = action.payload.id;
      state.count = 1;
    },
    closeModalInfo: (state) => {
      state.isOpen = false;
      state.id = "";
    },
    addProductModule: (state) => {
      state.count += 1;
    },
    delProductModule: (state) => {
      if (state.count > 1) {
        state.count -= 1;
      }
    },
  },
});

export const {
  openModalInfo,
  closeModalInfo,
  addProductModule,
  delProductModule,
} = modalInfoSlice.actions;
export default modalInfoSlice.reducer;
