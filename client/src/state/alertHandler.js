const { SET_ALERT, REMOVE_ALERT } = require('./types');

export default (data, dispatch) => {
  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  dispatch({ type: SET_ALERT, payload: data['msg'] });
};
