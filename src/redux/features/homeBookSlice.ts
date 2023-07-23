import { createSlice } from "@reduxjs/toolkit";
import { IBooks } from "../../types/globalTypes";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IHomeBook {
  books: IBooks[];
}

const initialState: IHomeBook = {
  books: [],
};
const homeBookSlice = createSlice({
  name: "homeBook",
  initialState,
  reducers: {
    addHomeBook: (state, action: PayloadAction<IBooks>) => {
      state.books.push(action.payload);
    },
  },
});

export const { addHomeBook } = homeBookSlice.actions;
export default homeBookSlice.reducer;
