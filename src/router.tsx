import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

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
        <Route path="/" element={<Navigate to="/inspection" />} />

        <Route path="inspection">
          <Route index element={<InspectionPageImage />} />
          <Route path="create" element={<InspectionPageCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
