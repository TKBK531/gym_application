import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./pages/BaseLayout";
import Home from "./pages/Home";
import Ground from "./pages/Ground";

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
