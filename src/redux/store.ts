import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/books/bookSlice";
import homeReducer from "./features/home/homeSlice";
import userReducer from "./features/user/userSlice";
import { api } from "./api/apiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  book: bookReducer,
  home: homeReducer,
  user: userReducer,

  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
