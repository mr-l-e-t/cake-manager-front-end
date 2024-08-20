import { redirect, useParams } from "react-router-dom";
import CakeForm from "../components/cake/CakeForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  cakeDetailsQuery,
  invalidateCakeRelatedQueries,
  queryClient,
} from "../util/reactQuery";
import { Suspense } from "react";
import toast from "react-hot-toast";
import { editCake } from "../util/http";

function CakeEditForm() {
  const params = useParams();

  const { data: cake } = useSuspenseQuery(cakeDetailsQuery(params.cakeID));

  return <CakeForm cake={cake}  />;
}

function CakeEdit() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <CakeEditForm />
    </Suspense>
  );
}
export default CakeEdit;

export async function action({ request, params }) {
  if (!params.cakeID) {
    throw new Error("No cake ID provided");
  }
  const cakeToUpdate = await request.json(); //obtain json encoded object from request

  await editCake({ cakeID: params.cakeID, cake: { ...cakeToUpdate } });

  invalidateCakeRelatedQueries();

  toast.success("cake successfully updated");

  return redirect(`/cake/${params.cakeID}`);
}
