import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ import this
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/MainRoutes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="328106561534-ed4vpgglkqi4dicuuufmcv9jl7koh9o9.apps.googleusercontent.com"> {/* ✅ Add this */}
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
