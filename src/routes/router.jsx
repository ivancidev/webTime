import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";
import { Home } from "../features/books/pages/home-books";
import { BookInfo } from "../features/books/pages/book-info";
import { Root } from "../layouts/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/book-info/:bookId",
        element: <BookInfo />,
      }
    ]
  },
  {
    path: "/upload-files",
    element: <Files />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);
