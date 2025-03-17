import { type FC, Suspense, lazy } from "react";
import { Navigate } from "react-router";

import LoadingIndicator from "./components/Indicator/LoadingIndicator";
import Layout from "./components/Layout/RootLayout";
import { ROUTE_PATH_MAP } from "./constants/routes";

const Loader = (Component: FC) => (props: any) => (
  <Suspense fallback={<LoadingIndicator />}>
    <Component {...props} />
  </Suspense>
);

const HomePage = Loader(lazy(() => import("./pages/HomePage")));

export const routes = [
  {
    path: ROUTE_PATH_MAP.Home,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "*",
        element: <Navigate to={ROUTE_PATH_MAP.Home} replace />,
        // element={<NotFound />}
      },
    ],
  },
];
