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
    ADMIN_PRODUCTS,
} from 'constants/paths';
import { PrivateRouter } from './PrivateRouter';
import { Categories } from 'pages/Admin/Categories';
import { Products } from 'pages/Admin/Products';
import { Loader } from 'components/Loader';
import { Login } from 'pages/Admin/Auth/Login';
import { Users } from 'pages/Admin/Users';
import { Auth } from 'pages/Admin/Auth';
import { Form } from 'pages/Admin/Products/Form';
import { List } from 'pages/Admin/Products/List';

import Home from 'pages/Home';

const ProductDetails = lazy(() => import('pages/ProductDetails'));
const Register = lazy(() => import('pages/Admin/Auth/Register'));
const NotFound = lazy(() => import('components/NotFound'));
const Recover = lazy(() => import('pages/Admin/Auth/Recover'));
const Catalog = lazy(() => import('pages/Catalog'));
const Admin = lazy(() => import('pages/Admin'));

export const ComponentRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={ADMIN_AUTH} element={<Auth />}>
                    <Route index element={<Login />} />
                    <Route path={ADMIN_AUTH_RECOVER} element={<Recover />} />
                    <Route path={ADMIN_AUTH_REGISTER} element={<Register />} />
                </Route>

                <Route path={ADMIN} element={<Admin />}>
                    <Route index element={<h1>Index</h1>} />

                    <Route
                        path={ADMIN_PRODUCTS}
                        element={
                            <PrivateRouter>
                                <Products />
                            </PrivateRouter>
                        }
                    >
                        <Route index element={<List />} />
                        <Route path=":productId" element={<Form />} />
                    </Route>

                    <Route
                        path={ADMIN_CATEGORIES}
                        element={
                            <PrivateRouter>
                                <Categories />
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path={ADMIN_USERS}
                        element={
                            <PrivateRouter roles={['ROLE_ADMIN']}>
                                <Users />
                            </PrivateRouter>
                        }
                    />
                </Route>

                <Route path={HOME} element={<Home />} />
                <Route path={CATALOG} element={<Catalog />} />
                <Route path={DETAILS} element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};
