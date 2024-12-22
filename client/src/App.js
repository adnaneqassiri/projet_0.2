import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyProducts from "./pages/MyProducts";
import ModifierProduit from "./pages/ModifierProduit";
import Ajouter from "./pages/Ajouter";
import ValidatePanier from "./pages/ValidatePanier";
import Les_commandes from "./pages/Les_commandes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
export default function App() {
  let router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <ProductDetails />,
        },
        {
          path: "purchase",
          element: <Purchase />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "signin",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "les_commandes",
          element: <Les_commandes />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "myProducts",
          element: <MyProducts />,
        },
        {
          path: "myProducts/ajouter",
          element: <Ajouter />,
        },
        {
          path: "myProducts/:id",
          element: <ModifierProduit />,
        },
        {
          path: "validateOrder",
          element: <ValidatePanier />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </>
  );
}
