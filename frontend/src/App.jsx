import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  PageNotFound,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />,
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
        element: <Events />,
      },
    ],
  },
  {
    path: "/items",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Items />,
      },
    ],
  },
  {
    path: "/reservations",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Reservations />,
      },
    ],
  },
  {
    path: "/members",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Members />,
      },
    ],
  },
  {
    path: "/sports",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Sports />,
      },
    ],
  },
  {
    path: "/profile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
