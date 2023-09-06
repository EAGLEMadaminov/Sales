"use client";
import React, { useContext, useState } from "react";

const Appcontext = React.createContext();

const AppProvider = ({ children }) => {
  const [choosenProduct, setChoosenProduct] = useState({});
  const [cartNum, setCartNum] = useState(0);
  const [cart, setCart] = useState([]);
  const addToCart = () => {
    setCart((cart) => [...cart, choosenProduct]);
    setCartNum(cartNum + 1);
  };

  const removeFromCart = (productId) => {
    setCart((cart) => cart.filter((item) => item.id !== productId));
    setCartNum(cartNum - 1);
  };
  return (
    <Appcontext.Provider
      value={{
        choosenProduct,
        setChoosenProduct,
        cartNum,
        setCartNum,
        cart,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Appcontext);
};
export { Appcontext, AppProvider };
