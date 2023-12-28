import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productId, size) {
    setCartProducts((prev) => [...prev, { id: productId, size }]);
  }
  function removeProduct(productId, size) {
    setCartProducts((prev) => {
      const productsCpy = [...prev]
      const index = productsCpy.findIndex(
        (item) => item.id == productId && item.size == size
      );
      index !== -1 && productsCpy.splice(index, 1)
      return productsCpy;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
