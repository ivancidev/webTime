import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
]);
