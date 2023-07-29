/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cards from "../pages/Cards";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./privateRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../redux/store";
import SearchBook from "../pages/SearchBook";
import { BookDetail } from "../pages/BookDetail";

const persistor = persistStore(store);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Cards",
        element: <Cards book={undefined} />,
      },

      //   {
      //     path: "/product-details/:id",
      //     element: <ProductDetails />,
      //   },
      //   {
      //     path: "/checkout",
      //     element: <Checkout />,
      //   },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/allbooks",
    element: (
      <PrivateRoute>
        <AllBooks />
      </PrivateRoute>
    ),
  },

  {
    path: "/search/:searchText",
    element: <SearchBook />,
  },
  {
    path: "/book-details/:id",
    element: <BookDetail />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);

export default routes;
