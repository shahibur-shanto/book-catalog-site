import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBooks } from "../../../types/globalTypes";

interface IHomeBook {
  books: IBooks[];
}

const initialState: IHomeBook = {
  books: [],
};
const homeBookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addHomeBook: (state, action: PayloadAction<IBooks>) => {
      state.books.push(action.payload);
    },
  },
});

export const { addHomeBook } = homeBookSlice.actions;
export default homeBookSlice.reducer;
