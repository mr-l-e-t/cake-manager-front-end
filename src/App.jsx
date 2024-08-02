import "./styling/css/style.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Cakes, { loader as cakesLoader } from "./pages/Cakes.jsx";
import Cake, {
  loader as cakeDetailLoader,
  deleteCake as deleteCakeAction,
} from "./pages/Cake.jsx";
import CakeNew from "./pages/CakeNew.jsx";
import ErrorPage from "./pages/Error.jsx";
import CakeEdit from "./pages/CakeEdit.jsx";
import { cakeAction } from "./components/cake/CakeForm.jsx";
import { queryClient } from "./util/reactQuery.js";
import { QueryClientProvider } from "@tanstack/react-query";

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
      },
      {
        path: "/cake/:cakeID",
        id: "cake-detail",
        loader: cakeDetailLoader,
        children: [
          {
            index: true,
            element: <Cake />,
            action: deleteCakeAction, //action are writes to the loaders' reads
          },
          {
            path: "edit",
            element: <CakeEdit />,
            action: cakeAction,
          },
        ],
      }, //Why can't I add this as a child of cakes and get it to work?
      {
        path: "/cake/new",
        element: <CakeNew />,
        action: cakeAction,
      },
      //TODO: add login page
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={siteNavigationRouter} />
    </QueryClientProvider>
  );
}

export default App;
