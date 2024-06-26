import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import CakesList from "../components/CakesList.jsx";
import { cakes as cakesTest } from "../temp/utils.js";
import PageTitle from "../components/PageTitle.jsx";

const cakesList = [...cakesTest];
function Cakes() {
  const { cakesReturned } = useLoaderData(); //read data passed by loader

  return (
    <main className="page">
      <PageTitle title="Recipes" />

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={cakesReturned}>
          {(loadedCakes) => <CakesList cakes={loadedCakes} />}
        </Await>
      </Suspense>
    </main>
  );
}
export default Cakes;

async function loadCakes() {
  //TODO: replace with call to backend
  return cakesList;
}
export function loader() {
  return defer({
    cakesReturned: loadCakes(),
  });
}
