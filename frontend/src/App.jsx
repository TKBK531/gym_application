import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleLoginLoading from "./components/Loading/GoogleLoginLoading";
import {
  // BaseLayout,
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
import BaseLayout from "./components/Layouts/BaseLayout";
import MembersGym from "./pages/MembersGym";
import MembersGround from "./pages/MembersGround";
import MembersPool from "./pages/MembersPool";

const router = createBrowserRouter([
  // Dashboard route
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
  // Events route
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
  // Items route
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
  // Reservations route
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
  // Members route
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
      {
        path: "membersGym",
        element: (
          <ProtectedRoute>
            <MembersGym />
          </ProtectedRoute>
        ),
      },
      {
        path: "membersGround",
        element: (
          <ProtectedRoute>
            <MembersGround />
          </ProtectedRoute>
        ),
      },
      {
        path: "membersPool",
        element: (
          <ProtectedRoute>
            <MembersPool />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Sports route
  {
    path: "/sports",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Sports />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Profile route
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
  // Login, Logout, Register, and PageNotFound routes
  { path: "/loading", element: <GoogleLoginLoading /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
