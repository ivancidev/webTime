import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";
import { Home } from "../features/books/pages/home-books";
import { BookInfo } from "../features/books/pages/book-info";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload-files",
    element: <Files />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/book-info",
    element: <BookInfo />,
  }
]);
