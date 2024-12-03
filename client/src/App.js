import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./CartContext";
import { Contact } from "./pages/Contact";
import About from "./pages/About";
import MyProducts from "./pages/MyProducts";
import ModifierProduit from "./pages/ModifierProduit";
import Ajouter from "./pages/Ajouter";
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
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}
