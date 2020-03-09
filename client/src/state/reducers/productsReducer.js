import {
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CART,
  SET_CART
} from '../types';

const errState = {
  product: null,
  products: null,
  cart: null
};

export default (state = errState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: null
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: [...state.products].map(prod =>
          prod.id === payload.id ? payload : prod
        )
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: [...state.products].filter(prod => prod.id !== payload.id)
      };
    case GET_CART:
      return {
        ...state,
        cart: payload
      };
    case SET_CART:
      return {
        ...state,
        cart: [...state.cart].push(payload)
      };
    default:
      return state;
  }
};
