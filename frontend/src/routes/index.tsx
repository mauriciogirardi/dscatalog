import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  ADMIN_CATEGORIES,
  ADMIN_PRODUCTS,
  ADMIN_USERS,
  ADMIN,
  CATALOG,
  DETAILS,
  HOME,
} from 'constants/paths';
import Home from 'pages/Home';
import { Spinner, Flex } from '@chakra-ui/react';

const ProductDetails = lazy(() => import('pages/ProductDetails'));
const Catalog = lazy(() => import('pages/Catalog'));
const Admin = lazy(() => import('pages/Admin'));

export const ComponentRoutes = () => {
  return (
    <Suspense
      fallback={
        <Flex align="center" justify="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.400"
            color="blue.500"
            size="xl"
          />
        </Flex>
      }
    >
      <Routes>
        <Route path={ADMIN} element={<Admin />}>
          <Route path={ADMIN_PRODUCTS} element={<h1>Product List</h1>} />
          <Route path={ADMIN_CATEGORIES} element={<h1>Categories List</h1>} />
          <Route path={ADMIN_USERS} element={<h1>Users List</h1>} />
        </Route>

        <Route path={HOME} element={<Home />} />
        <Route path={CATALOG} element={<Catalog />} />
        <Route path={DETAILS} element={<ProductDetails />} />
        <Route path="*" element={<h1>Not found!!</h1>} />
      </Routes>
    </Suspense>
  );
};
