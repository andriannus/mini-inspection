import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Layout } from '#/components/layout';

const StandalonePageHome = lazy(() =>
  import('./package/standalone/pages/home').then((module) => ({
    default: module.StandalonePageHome,
  })),
);

const InspectionPageCreate = lazy(() =>
  import('./package/inspection/pages/create').then((module) => ({
    default: module.InspectionPageCreate,
  })),
);

const InspectionPageImage = lazy(() =>
  import('./package/inspection/pages/image').then((module) => ({
    default: module.InspectionPageImage,
  })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<StandalonePageHome />} />

          <Route path="inspection">
            <Route path="create" element={<InspectionPageCreate />} />
            <Route path="image" element={<InspectionPageImage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
