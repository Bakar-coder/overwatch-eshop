import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import Layout from "./components/layouts/layouts";
import { bindActionCreators } from "redux";
import { setCurrent, getProducts, getCart } from "./state/actions";

const App = ({
  route,
  auth,
  alert,
  setCurrent,
  error,
  getProducts,
  getCart
}) => {
  getProducts();
  setCurrent();
  auth && getCart();

  return (
    <Layout>
      {alert && <div className="alert alert-success">{alert}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {renderRoutes(route.routes)}
    </Layout>
  );
};

function mapState({ auth, alerts, errors }) {
  return { alert: alerts.alert, error: errors.error, auth: auth.isAuth };
}

function mapDispatch(dispatch) {
  return bindActionCreators({ setCurrent, getProducts, getCart }, dispatch);
}

export default {
  component: connect(
    mapState,
    mapDispatch
  )(App),
  loadData: ({ dispatch }) => dispatch(getProducts())
};
