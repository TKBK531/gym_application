import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { UserDataProvider } from "./context/UserDataProvider"; // Import the UserDataProvider component
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
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
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    // <UserDataProvider>
    <RouterProvider router={router} />
    // </UserDataProvider>
  );
}

export default App;
