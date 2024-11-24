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
import { ForumComment } from "../features/forums/pages/forum-comment";
import { ProtectedRouter } from "./protected-router";
import { Login } from "../features/login/pages/login";
import { ResetPassword } from "../features/login/pages/reset-password";
import { CreateCollection } from "../features/collections/pages/create-collection";
import { Forum } from "../features/forums/pages/forum";
import { ViewCollections } from "../features/collections/pages/view-collections";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register-user",
    element: <RegisterUser />,
  },
  {
    path: "/preferences",
    element: <SelectPreferences />,
  },
  {
    path: "/profile",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "book-info/:bookId",
        element: <BookInfo />,
      },
      {
        path: "register-collection",
        element: <CreateCollection />,
      },
      {
      path: "view-collection", // Nueva ruta para ver colecciones
      element: <ViewCollections />,
      },
      {
        path: "forums",
        element: <Forum />,
      },
    ],
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
        path: "book-info/:bookId",
        element: <BookInfo />,
      },
      {
        path: "forums",
        element: <Forum />,
      },
    ],
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/comment/:id",
    element: <ForumComment />,
  },
]);
