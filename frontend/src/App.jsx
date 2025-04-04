import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path:"/home",
      element:<Home/>
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;