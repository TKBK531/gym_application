import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleLoginLoading from "./components/Loading/GoogleLoginLoading";
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
import MembersGym from "./pages/MembersGym";
import MembersGround from "./pages/MembersGround";
import MembersPool from "./pages/MembersPool";

const router = createBrowserRouter([
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
