import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Home from "../pages/Home";
import Update from "../pages/Update";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
      
        <Add />
      
    ),
  },
  {
    path: "/update/:id",
    element: (

        <Update />
    ),
  },
]);
export default router;
