import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { AudioProvider } from "./context/audio-context";

function App() {
  return (
    <AudioProvider>
      <RouterProvider router={router} />
    </AudioProvider>
  );
}

export default App;
