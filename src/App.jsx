import "./styling/css/style.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Cakes, { loader as cakesLoader } from "./pages/Cakes.jsx";
import Cake, {
  loader as cakeDetailLoader,
  action as deleteCakeAction,
} from "./pages/Cake.jsx";
import CakeNew, { action as createCakeAction } from "./pages/CakeNew.jsx";
import ErrorPage from "./pages/Error.jsx";
import CakeEdit, { action as editCakeAction } from "./pages/CakeEdit.jsx";
import { queryClient } from "./util/reactQuery.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const siteNavigationRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Cakes />,
        loader: cakesLoader
      },
      {
        path: "/cakes",
        element: <Cakes />
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
            action: editCakeAction,
          },
        ],
      },
      {
        path: "/cake/new",
        element: <CakeNew />,
        action: createCakeAction,
      },
      //TODO: add login page
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={siteNavigationRouter} />
      </QueryClientProvider>
      <Toaster position="top-center" />
      {/*notification when doing cake modifications */}
    </>
  );
}
export default App;