import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";

export const router = createBrowserRouter([
  {
    path: "/registerbooks",
    element: <Register />,
  },
  {
    path: "/files",
    element: <Files />,
  }
]);
