import { SET_ERROR, REMOVE_ERROR } from './types';

export default (ex, dispatch) => {
  const removeError = () => dispatch({ type: REMOVE_ERROR });

  if (
    (ex && ex.response && ex.response.data && ex.response.status >= 400) ||
    (ex && ex.response && ex.response.data && ex.response.status <= 500)
  ) {
    setTimeout(() => removeError(), 3000);
    dispatch({
      type: SET_ERROR,
      payload: ex.response.data['msg']
        ? ex.response.data['msg']
        : ex.response
        ? 'Server Error: Internal Server Error!'
        : 'Internal Server Error,  Try again later and if this persists contact support.'
    });
  } else if (ex && ex.status === 401) {
    setTimeout(() => removeError(), 3000);
    dispatch({
      type: SET_ERROR,
      payload: 'ACCESS DENIED! - LOGIN TO CONTINUE.'
    });
  } else {
    setTimeout(() => removeError(), 3000);
    dispatch({
      type: SET_ERROR,
      payload: `Oops! - something went wrong. - ${ex}`
    });
  }
};
