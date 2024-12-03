import { createContext, useState } from "react";
import { products } from "./products";
export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export const CartProvider = ({ children }) => {
  // [{id:1,quantity:2}, {id:3,quantity:4}]
  const [cartProducts, setCartProducts] = useState([]);

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find((el) => el.id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addOneToCart = (id, quantity) => {
    if (getProductQuantity(id) === 0) {
      // if not in cart
      setCartProducts((p) => [...p, { id: id, quantity: quantity }]);
    } else {
      // if in cart
      setCartProducts((p) => {
        return p.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity + quantity } : el
        );
      });
    }
  };

  const removeOneFromCart = (id) => {
    if (getProductQuantity(id) === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts((p) => {
        return p.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity - 1 } : el
        );
      });
    }
  };

  const deleteFromCart = (id) => {
    //  filtering the products in cart and deleting the product
    setCartProducts((p) => p.filter((el) => el.id !== id));
  };

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((el) => {
      const productData = products.find((e) => e.id === el.id);
      return (totalCost += productData.price * productData.quantity);
    });
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
