import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";
import { Home } from "../features/books/pages/home-books";
import { BookInfo } from "../features/books/pages/book-info";
import { Root } from "../layouts/root";
import { RegisterUser } from "../features/users/pages/register-user";
import { Profile } from "../features/users/pages/profile";

export const router = createBrowserRouter([
  {
    path: "/register-user",
    element: <RegisterUser />,
  },
  {
    path: "/profile",
    element: <Profile />
  },
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
