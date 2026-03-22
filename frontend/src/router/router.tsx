import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@pages/Dashboard";
import ClinicsQueue from "@pages/ClinicsQueue";
import Login from "@pages/Login";
import Queues from "@pages/Queues";
import NotFound from "@pages/NotFound";
import Master from "@/pages/Master";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "clinics-queue", element: <ClinicsQueue /> },
      { path: "queues", element: <Queues /> },
      { path: "master", element: <Master /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
