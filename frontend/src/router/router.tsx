import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@pages/Dashboard";
import Queues from "@pages/Queues";
import NotFound from "@pages/NotFound";
import Master from "@/pages/Master";
import { LogIn } from "lucide-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "login", element: <LogIn /> },
      { path: "queues", element: <Queues /> },
      { path: "master", element: <Master /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
