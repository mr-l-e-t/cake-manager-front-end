import { Await, defer, useRouteLoaderData } from "react-router-dom";
import CakeDetail from "../components/CakeDetail";
import PageTitle from "../components/PageTitle";
import { Suspense } from "react";

import { cakes as cakesTest } from "../temp/utils.js";

function Cake() {
  const { cake } = useRouteLoaderData("cake-recipe-detail");

  return (
    <main className="page">
      <PageTitle title="Recipe" />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={cake}>
          {(loadedCake) => (
            <CakeDetail cake={loadedCake} isViewFullRecipe />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
export default Cake;

async function loadCake(id) {
  //TODO: replace with call to backend
  return cakesTest.findLast((cake) => cake.id == id);
}

export async function loader({ params }) {
  //request action from pages such as edit or delete. to be used in such scenarios
  const id = params.cakeID;
  return defer({
    cake: await loadCake(id),
  });
}
