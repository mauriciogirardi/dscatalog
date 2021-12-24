import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';

const Product = lazy(() => import('pages/Product'));

export const ComponentRoutes = () => {
  return (
    <Suspense fallback="Carregando...">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Suspense>
  );
};
