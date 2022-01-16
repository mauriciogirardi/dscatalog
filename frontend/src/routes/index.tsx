import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  ADMIN_CATEGORIES,
  ADMIN_USERS,
  ADMIN,
  CATALOG,
  DETAILS,
  HOME,
  ADMIN_AUTH,
  ADMIN_AUTH_RECOVER,
  ADMIN_AUTH_REGISTER,
} from 'constants/paths';
import Home from 'pages/Home';
import { Loader } from 'components/Loader';
import { Auth } from 'pages/Admin/Auth';
import { Login } from 'pages/Admin/Auth/Login';
import { useAuth } from 'hooks/useAuth';

const ProductDetails = lazy(() => import('pages/ProductDetails'));
const Register = lazy(() => import('pages/Admin/Auth/Register'));
const NotFound = lazy(() => import('components/NotFound'));
const Recover = lazy(() => import('pages/Admin/Auth/Recover'));
const Catalog = lazy(() => import('pages/Catalog'));
const Admin = lazy(() => import('pages/Admin'));
const User = lazy(() => import('pages/Admin/User'));

export const ComponentRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {!isAuthenticated && (
          <Route path={ADMIN_AUTH} element={<Auth />}>
            <Route index element={<Login />} />
            <Route path={ADMIN_AUTH_RECOVER} element={<Recover />} />
            <Route path={ADMIN_AUTH_REGISTER} element={<Register />} />
          </Route>
        )}

        {isAuthenticated && (
          <Route path={ADMIN} element={<Admin />}>
            <Route index element={<h1>Product List</h1>} />
            <Route path={ADMIN_CATEGORIES} element={<h1>Categories List</h1>} />
            <Route path={ADMIN_USERS} element={<User />} />
          </Route>
        )}

        <Route path={HOME} element={<Home />} />
        <Route path={CATALOG} element={<Catalog />} />
        <Route path={DETAILS} element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
