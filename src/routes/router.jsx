import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";
import { Home } from "../features/books/pages/home-books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/files",
    element: <Files />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
