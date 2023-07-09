import { React, createContext, useContext, useReducer } from 'react';
import product from '../util';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();

export const Context = ({ children }) => {
  
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer,{
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  })
  
  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>
  )
};

export const CartState = () => {
  return useContext(Cart);
}

 
