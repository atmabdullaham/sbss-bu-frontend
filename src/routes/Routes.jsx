import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/programme/RegistrationForm";
import Layout from "../layouts/Layout";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/auth/Login";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Programme from "../pages/Programme";
import ProgrammeDetails from "../pages/ProgrammeDetails";
import RegistrationSuccess from "../pages/RegistrationSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/programmes/:id",
        element: <ProgrammeDetails />,
      },
      {
        path: "/programmes",
        element: <Programme />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
      {
        path: "/registration-success",
        element: <RegistrationSuccess />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
