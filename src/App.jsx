import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Register } from "./features/register/pages/register-books";
import { router } from "./routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
