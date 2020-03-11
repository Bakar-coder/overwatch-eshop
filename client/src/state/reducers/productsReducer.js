import {
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CART,
  SET_CART,
  DELETE_CART,
  CART_PRODUCT_DECREMENT,
  SET_TOTAL_AMOUNT,
  SET_ORDERS
} from '../types';

const errState = {
  product: null,
  products: null,
  cart: [],
  orders: [],
  total: null
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
        cart:
          state.cart.length === 0
            ? payload
            : [...state.cart].map(item =>
                item.id === payload.id ? payload : item
              )
      };

    case DELETE_CART:
      return {
        ...state,
        cart: [...state.cart].filter(item => item.id !== payload.id)
      };

    case CART_PRODUCT_DECREMENT:
      return {
        ...state,
        cart: [...state.cart].map(item =>
          item.id === payload.id ? payload : item
        )
      };
    case SET_TOTAL_AMOUNT:
      return {
        ...state,
        total: payload
      };
      case SET_ORDERS:
        return {
          ...state,
          orders: payload
        }

    default:
      return state;
  }
};
