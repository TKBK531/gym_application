import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import BaseLayout from "./pages/BaseLayout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Items from "./pages/Items";
import Reservations from "./pages/Reservations";
import Login from "./pages/Login"; // Import the Login component
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
