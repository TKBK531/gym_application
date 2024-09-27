import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleLoginLoading from "./components/Loading/GoogleLoginLoading";
import SportCardPage from "./components/Sport/SportCardPage";
import {
  BaseLayout,
  Home,
  Events,
  Items,
  Reservations,
  Members,
  Sports,
  Profile,
  Login,
  Logout,
  PageNotFound,
} from "./pages";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/events",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/items",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Items />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/reservations",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/members",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/sports",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Sports /> }, // Route for the main Sports list
      { path: ":sportName", element: <SportCardPage /> }, // Dynamic route for sport pages
    ],
  },
  {
    path: "/profile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Single routes not requiring nested structure
  { path: "/loading", element: <GoogleLoginLoading /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);
