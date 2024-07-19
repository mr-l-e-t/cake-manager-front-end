import "./styling/css/style.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Cakes, { loader as cakesLoader } from "./pages/Cakes.jsx";
import CakeDetail, { loader as cakeRecipeDetailLoader } from "./pages/Cake.jsx";
import CakeNew from "./pages/CakeNew.jsx";

import ErrorPage from "./pages/Error.jsx";

const siteNavigationRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Cakes />, loader: cakesLoader },
      {
        path: "/cakes",
        element: <Cakes />,
        loader: cakesLoader,
        // children: [ //this doesn't work - find out why!
        //   {
        //     path: "/cakes/:cakeID",
        //     id: "cake-recipe-detail",
        //     loader: cakeRecipeDetailLoader,
        //     children: [{ index: true, element: <CakeDetail /> }],
        //   },
        // ],
      },
      {
        path: "/cakes/:cakeID",
        element: <CakeDetail />,
        id: "cake-recipe-detail",
        loader: cakeRecipeDetailLoader,
      }, //Why can't I add this as a child of cakes and get it to work?
      {
        path: "/cakes/new",
        element: <CakeNew />,
      },
      //TODO: add login page
    ],
  },
]);
function App() {
  return <RouterProvider router={siteNavigationRouter} />;
}

export default App;
