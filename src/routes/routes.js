import { createBrowserRouter } from "react-router-dom";
import StepperPage from "../pages/StepperPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <StepperPage />,
    },
  
    // {
    //   path: "*",
    //   element: <Error />,
    // },
  ]);