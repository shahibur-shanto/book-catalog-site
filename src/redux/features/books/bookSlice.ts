import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBooks } from "../../../types/globalTypes";

interface IHomeBook {
  books: IBooks[];
}

const initialState: IHomeBook = {
  books: [],
};
const allBookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    allBook: (state, action: PayloadAction<IBooks>) => {
      state.books.push(action.payload);
    },
    searchBook: (state, action: PayloadAction<IBooks>) => {
      state.books.push(action.payload);
      // console.log(action.payload);
    },
    
  },
});

export const { allBook, searchBook } = allBookSlice.actions;
export default allBookSlice.reducer;
