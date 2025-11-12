// src/App.tsx

import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectDemoLoader from "./pages/projects/ProjectDemoLoader";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // slug-based detail route
  { path: "/project/:slug", element: <ProjectDetail /> },
  // live demo
  { path: "/projects/:slug", element: <ProjectDemoLoader /> },
  { path: "*", element: <h1 className="p-6 text-center">404 Not Found</h1> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
