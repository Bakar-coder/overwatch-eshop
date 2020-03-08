import {
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../types';

const errState = {
  product: null,
  products: null
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
    default:
      return state;
  }
};
