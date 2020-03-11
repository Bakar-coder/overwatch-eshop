import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_CART,
  SET_CART,
  DELETE_CART,
  CART_PRODUCT_INCREMENT,
  CART_PRODUCT_DECREMENT,
  SET_TOTAL_AMOUNT,
  SET_ORDERS
} from '../types';
import setError from '../errorHandler';
import setAlert from '../alertHandler';

export const getProducts = () => async (dispatch, getState, api) => {
  try {
    const { data } = await api.get('/api/products');
    return dispatch({ type: GET_PRODUCTS, payload: data.products });
  } catch (ex) {
    console.log(ex);
  }
};

export const deleteProduct = product => async (dispatch, getState, api) => {
  try {
    const { data } = await api.post('/api/admin/delete-product', product);
    if (data.success) dispatch({ type: DELETE_PRODUCT, payload: product });
    setAlert(data, dispatch);
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const getCart = () => async (dispatch, getState, api) => {
  try {
    const { data } = await api.get('/api/cart');
    dispatch({ type: GET_CART, payload: data.products });
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const addToCart = (product, history, auth) => async (
  dispatch,
  getState,
  api
) => {
  try {
    let res;
    if (auth) {
      res = await api.post('/api/cart', product);
      if (product.cartItem) {
        product.cartItem.quantity += 1;
        return dispatch({ type: SET_CART, payload: product });
      } else {
        dispatch({ type: SET_CART, payload: res.data.products });
        return history.push('/cart');
      }
    } else return history.push('/users/login');
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const productDeccrement = (product, history, auth) => async (
  dispatch,
  getState,
  api
) => {
  try {
    if (auth) {
      if (product.cartItem.quantity < 2) return;
      const { data } = await api.post('/api/cart/decrement', product);
      product.cartItem.quantity -= 1;
      dispatch({ type: CART_PRODUCT_DECREMENT, payload: product });
      history.push('/cart');
    } else history.push('/users/login');
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const submitOrder = history => async (dispatch, getState, api) => {
  try {
    const { data } = await api.post('/api/orders');
    setAlert(data, dispatch);
    history.push('/');
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const deleteCartItem = cart => async (dispatch, getState, api) => {
  try {
    const { data } = await api.post('/api/cart/delete', cart);
    if (data.success) {
      dispatch({ type: DELETE_CART, payload: cart });
    }
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const setAmount = cart => async dispatch => {
  try {
    const totalAmount = cart
      .map(item => item.cartItem.quantity * item.price)
      .reduce((a, b) => a + b)
      .toFixed(2);
    dispatch({ type: SET_TOTAL_AMOUNT, payload: totalAmount });
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const getOrders = orders => async (dispatch, getState, api) => {
  try {
    if (orders.length === 0) {
      const { data } = await api.get('/api/orders');
      dispatch({ type: SET_ORDERS, payload: data.orders });
    }
  } catch (ex) {
    setError(ex, dispatch);
  }
}
