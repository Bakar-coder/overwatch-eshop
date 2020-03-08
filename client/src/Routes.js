import Home from './Pages/Home';
import App from './App';
import Register from './Pages/Signup';
import Login from './Pages/Signin';
import AddProduct from './Pages/admin/add-product';
import AdminProdocts from './Pages/admin/products';
import EditProduct from './Pages/admin/edit-product';
import SingleProduct from './Pages/shop/SingleProduct';
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
        ...SingleProduct,
        path: '/products/:title',
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
        ...PageNotFound
      }
    ]
  }
];

export default Routes;
