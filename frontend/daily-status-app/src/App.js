import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Project from "./Pages/Project";
import Team from "./Pages/Team";
import Status from "./Pages/Status";
import { Box } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "teams",
        element: <Team />,
      },
      {
        path: "status",
        element: <Status />,
      },
    ],
  },
]);

function Main() {
  return (
    <Grid2 container>
      <Grid2 xs={2}>
        <Sidebar />
      </Grid2>
      <Grid2 xs={10}>
          <Outlet />
      </Grid2>
    </Grid2>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
