// router.js
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
import { Login } from "../features/login/pages/login";
import { ResetPassword } from "../features/login/pages/reset-password";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register-user",
    element: (
      <ProtectedRouter>
        <RegisterUser />
      </ProtectedRouter>
    ),
  },
  {
    path: "/preferences",
    element: (
      <ProtectedRouter>
        <SelectPreferences />
      </ProtectedRouter>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRouter>
        <Root />
      </ProtectedRouter>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "book-info/:bookId",
        element: <BookInfo />,
      },
    ],
  },
  {
    path: "/app",
    element: (
      <ProtectedRouter>
        <Root />
      </ProtectedRouter>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "book-info/:bookId",
        element: <BookInfo />,
      },
    ],
  },
  {
    path: "/upload-files",
    element: (
      <ProtectedRouter>
        <Files />
      </ProtectedRouter>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
