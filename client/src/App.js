import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import Layout from './components/layouts/layouts';
import { bindActionCreators } from 'redux';
import { setCurrent, getProducts } from './state/actions';

const App = ({ route, auth, alert, setCurrent, error, getProducts }) => {
  getProducts();
  setCurrent();
  return (
    <Layout>
      {alert && <div className='alert alert-success'>{alert}</div>}
      {error && <div className='alert alert-danger'>{error}</div>}
      {renderRoutes(route.routes)}
    </Layout>
  );
};

function mapState({ alerts, errors }) {
  return { alert: alerts.alert, error: errors.error };
}

function mapDispatch(dispatch) {
  return bindActionCreators({ setCurrent, getProducts }, dispatch);
}

export default {
  component: connect(mapState, mapDispatch)(App),
  loadData: ({ dispatch }) => dispatch(getProducts())
};
