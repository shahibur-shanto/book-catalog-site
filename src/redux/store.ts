import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/books/bookSlice";
import homeReducer from "./features/home/homeSlice";
import { api } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    book: bookReducer,
    home: homeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
