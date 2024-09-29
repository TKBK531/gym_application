import { createBrowserRouter } from "react-router-dom";
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
  // AllProfiles,
} from "./pages";
import Register from "./pages/Register";
import BaseLayout from "./components/Layouts/BaseLayout";
import MembersGym from "./pages/MembersGym";
import MembersGround from "./pages/MembersGround";
import MembersPool from "./pages/MembersPool";
import Table from "./components/Table";
import SportCardPage from "./components/Sport/SportCardPage";
import { AllProfiles } from "./pages";

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
      { index: true, element: <Sports /> },
      { path: ":sportName", element: <SportCardPage /> },
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
  {
    path: "/all-profiles",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AllProfiles />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/table",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Table />
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
