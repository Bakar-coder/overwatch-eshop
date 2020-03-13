import Home from './Pages/Home';
import App from './App';
import Register from './Pages/auth/Signup';
import Login from './Pages/auth/Signin';
import Reset from './Pages/auth/Reset';
import AddProduct from './Pages/admin/add-product';
import AdminProdocts from './Pages/admin/products';
import EditProduct from './Pages/admin/edit-product';
import Orders from './Pages/admin/orders';
import SingleProduct from './Pages/shop/SingleProduct';
import Cart from './Pages/shop/Cart';
import PageNotFound from './Pages/404';

const Routes = [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true
      },
      {
        ...AdminProdocts,
        path: '/admin/product',
        exact: true
      },
      {
        ...AddProduct,
        path: '/admin/add-product',
        exact: true
      },
      {
        ...Orders,
        path: '/admin/orders',
        exact: true
      },
      {
        ...SingleProduct,
        path: '/products/:title',
        exact: true
      },
      {
        ...Cart,
        path: '/cart',
        exact: true
      },
      {
        ...EditProduct,
        path: '/admin/edit-product/:id',
        exact: true
      },
      {
        ...Register,
        path: '/users/register',
        exact: true
      },
      {
        ...Login,
        path: '/users/login',
        exact: true
      },
      {
        ...Reset,
        path: '/users/reset/:token',
        exact: true
      },
      {
        ...PageNotFound
      }
    ]
  }
];

export default Routes;
