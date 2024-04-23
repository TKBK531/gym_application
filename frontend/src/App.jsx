import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./pages/BaseLayout";
import Home from "./pages/Home";
import Ground from "./pages/Ground";
import Gym from "./pages/Gym";
import Pool from "./pages/Pool";

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
    path: "/ground",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Ground />,
      },
    ],
  },
  {
    path: "/gym",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Gym />,
      },
    ],
  },
  {
    path: "/pool",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Pool />,
      },
    ],
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
