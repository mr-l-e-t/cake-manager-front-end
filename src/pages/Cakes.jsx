import { Suspense } from "react";
import CakesList from "../components/cake/CakesList.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { cakesListQuery, queryClient } from "../util/reactQuery.js";
import { useSuspenseQuery } from "@tanstack/react-query";

function CakesInternalElement() {
  const { data } = useSuspenseQuery(cakesListQuery());

  return <CakesList cakes={data} />;
}

function Cakes() {
  return (
    <main className="page">
      <PageTitle title="Recipes" />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <CakesInternalElement />
      </Suspense>
    </main>
  );
}
export default Cakes;

export async function loader() {
  // not returning / awaiting anything - just triggering the loading
  queryClient.ensureQueryData(cakesListQuery());
  return null;
}
