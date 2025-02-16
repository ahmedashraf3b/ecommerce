import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProdectRouter from "./components/ProtectedRouter/ProtectedRouter.jsx";
import ProductDetalis from "./components/ProductDetalis/ProductDetalis";
import CartContextProvider from "./Context/CartContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Code from "./components/Code/Code.jsx";
import NewPassword from "./components/NewPassword/NewPassword";
import CategoriesProduct from "./components/CategoriesProduct/CategoriesProduct";
import CheackOut from "./components/CheackOut/CheackOut.jsx";
import WishlistCotextProvider from "./Context/WishlistContext.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Allorders from './components/allorders/allorders';

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "ecommerce",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProdectRouter>
            <Home />
          </ProdectRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProdectRouter>
            <Brands />
          </ProdectRouter>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProdectRouter>
            <ProductDetalis />
          </ProdectRouter>
        ),
      },

      {
        path: "cart",
        element: (
          <ProdectRouter>
            <Cart />
          </ProdectRouter>
        ),
      },
      {
        path: "categories",
        element: (
          <ProdectRouter>
            {" "}
            <Categories />
          </ProdectRouter>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "Code", element: <Code /> },
      { path: "newPassword", element: <NewPassword /> },
      {
        path: "products",
        element: (
          <ProdectRouter>
            <Products />
          </ProdectRouter>
        ),
      },
      {
        path: "cheaktOut",
        element: (
          <ProdectRouter>
            <CheackOut />
          </ProdectRouter>
        ),
      },
      {
        path: "categories/:category",
        element: (
          <ProdectRouter>
            <CategoriesProduct />
          </ProdectRouter>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProdectRouter>
            <Wishlist />
          </ProdectRouter>
          
        ),
      },
      {
        path: "allorders",
        element: (
          <ProdectRouter>
            <Allorders />
          </ProdectRouter>
        ),
      },
      { path: "register", element: <Register /> },
      {
        path: "*",
        element: (
          <ProdectRouter>
            <NotFound />
          </ProdectRouter>
        ),
      },
      {
        path: "productdetails/:id/*",
        element: (
          <ProdectRouter>
            <NotFound />
          </ProdectRouter>
        ),
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <WishlistCotextProvider>
            <QueryClientProvider client={query}>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </QueryClientProvider>
          </WishlistCotextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
