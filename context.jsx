"use client";
import React, { useContext, useState, useEffect } from "react";
const Appcontext = React.createContext();

let counter = 0;

// Function to generate a unique ID
function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  counter++; // Increment the counter
  return `${timestamp}_${counter}`; // Combine timestamp and counter to create a unique ID
}

const AppProvider = ({ children }) => {
  const [choosenProduct, setChoosenProduct] = useState({});
  const [cartNum, setCartNum] = useState(0);
  const [cart, setCart] = useState([]);
  let [count, setCount] = useState(0);

  const addToCart = () => {
    choosenProduct.id = generateUniqueId();
    console.log(choosenProduct.id);
    setCart((prevState) => [
      ...prevState,
      { ...choosenProduct, id: generateUniqueId() },
    ]);
    console.log(cart);
    setCount(count++);
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
