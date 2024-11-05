import { createBrowserRouter } from "react-router-dom";
import { Register } from "../features/register/pages/register-books";
import { Files } from "../features/register/pages/upload-files";
import { Home } from "../features/books/pages/home-books";
import { BookInfo } from "../features/books/pages/book-info";
import { Root } from "../layouts/root";
import { RegisterUser } from "../features/users/pages/register-user";
import { Profile } from "../features/users/pages/profile";
import { SelectPreferences } from "../features/users/pages/select-preferences";
import { ProtectedRouter } from "./protected-router";
import { BookComplete } from "../features/books/pages/book-complete";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <RegisterUser />
      </ProtectedRouter>
    ),
  },
  { path: "/preferences", element: <SelectPreferences /> },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/app",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "app/book-info/:bookId",
        element: <BookInfo />,
      },
    ],
  },
  {
    path: "profile/app/book-info/:bookId",
    element: <BookComplete />,
  },
  {
    path: "/upload-files",
    element: <Files />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
